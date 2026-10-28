import { articleUrl } from "../content/repository.ts";
import type {
  Article,
  Author,
  ClinicalReviewer,
  Section,
  SiteData,
} from "../content/types.ts";
import {
  AI_CRAWLERS,
  DEFAULT_DESCRIPTION,
  PRIVATE_PATHS,
  SITE_NAME,
  SITE_TAGLINE,
  type SiteConfig,
} from "./site.ts";

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
}

export interface RobotsRule {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
}

export interface RobotsPolicy {
  rules: RobotsRule[];
  sitemap: string;
}

const DEMO_SECTIONS = new Set(["extra-sugar", "the-sugar-dish"]);
const POLICY_PATHS = [
  "/about",
  "/editorial-standards",
  "/medical-review",
  "/corrections",
  "/partnerships",
  "/masthead",
  "/contact",
  "/newsletter-archive",
  "/privacy",
  "/terms",
  "/accessibility",
  "/medical-disclaimer",
  "/editorial-independence",
  "/cookies",
];

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function isQuickAnswerLength(text: string): boolean {
  const count = wordCount(text);
  return count >= 40 && count <= 60;
}

export function articleMetaTitle(
  article: Pick<Article, "title" | "seoTitle">,
): string {
  const head = article.seoTitle.split("|")[0]?.trim();
  return head || article.title;
}

export function formatDate(iso: string): string {
  const date = new Date(iso.includes("T") ? iso : `${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export function isPublishedArticle(article: Article): boolean {
  if (article.status !== "published" || !article.publishedAt) return false;
  return !Number.isNaN(new Date(article.publishedAt).getTime());
}

export function hasClinicalReviewer(
  article: Article,
): article is Article & { reviewer: ClinicalReviewer } {
  if (article.category !== "glproud") return false;
  return !!article.reviewer && article.reviewer.name.trim().length > 0;
}

export function visibleFaq(
  article: Article,
): { question: string; answer: string }[] {
  return (article.faq ?? []).filter(
    (item) => item.question.trim() && item.answer.trim(),
  );
}

function contentDate(article: Article): Date | undefined {
  const raw = article.updatedAt || article.publishedAt;
  if (!raw) return undefined;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function latestDate(articles: readonly Article[]): Date | undefined {
  const dates = articles
    .filter(isPublishedArticle)
    .map(contentDate)
    .filter((date): date is Date => !!date);
  if (!dates.length) return undefined;
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

export function sitemapEntries(
  config: SiteConfig,
  data: SiteData,
): SitemapEntry[] {
  if (!config.indexable) return [];
  const entry = (path: string, lastModified?: Date): SitemapEntry =>
    lastModified
      ? { url: `${config.origin}${path}`, lastModified }
      : { url: `${config.origin}${path}` };
  const published = data.articles.filter(isPublishedArticle);
  const sections = data.categories.filter(
    (section) => !DEMO_SECTIONS.has(section.slug),
  );
  return [
    entry("/", latestDate(published)),
    ...sections.map((section) =>
      entry(
        `/${section.slug}`,
        latestDate(
          published.filter((article) => article.category === section.slug),
        ),
      ),
    ),
    entry("/stories", latestDate(published)),
    ...published.map((article) => {
      const modified = contentDate(article);
      return entry(articleUrl(article), modified);
    }),
    ...POLICY_PATHS.map((path) => entry(path)),
    entry("/authors"),
    ...data.authors.map((author) => entry(`/authors/${author.slug}`)),
  ];
}

export function robotsPolicy(config: SiteConfig): RobotsPolicy {
  const sitemap = `${config.origin}/sitemap.xml`;
  const aiRule: RobotsRule =
    config.aiCrawlers === "allow"
      ? { userAgent: [...AI_CRAWLERS], allow: "/" }
      : { userAgent: [...AI_CRAWLERS], disallow: "/" };
  if (!config.indexable) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }, aiRule],
      sitemap,
    };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [...PRIVATE_PATHS] },
      aiRule,
    ],
    sitemap,
  };
}

export function siteStructuredData(config: SiteConfig) {
  const origin = config.origin;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: SITE_NAME,
        url: origin,
        slogan: SITE_TAGLINE,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/logo.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: origin,
        description: DEFAULT_DESCRIPTION,
        publisher: { "@id": `${origin}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function breadcrumbStructuredData(
  items: { name: string; path: string }[],
  config: SiteConfig,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${config.origin}${item.path}`,
    })),
  };
}

export function collectionStructuredData(
  input: {
    name: string;
    description: string;
    path: string;
    crumbs: { name: string; path: string }[];
  },
  config: SiteConfig,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: input.name,
        description: input.description,
        url: `${config.origin}${input.path}`,
        isPartOf: { "@id": `${config.origin}/#website` },
      },
      breadcrumbStructuredData(input.crumbs, config),
    ],
  };
}

function reviewerPerson(reviewer: ClinicalReviewer) {
  const person: Record<string, unknown> = {
    "@type": "Person",
    name: reviewer.name.trim(),
  };
  if (reviewer.url && /^https:\/\//.test(reviewer.url))
    person.url = reviewer.url;
  if (reviewer.credentials?.trim())
    person.jobTitle = reviewer.credentials.trim();
  return person;
}

export function articleStructuredData(
  article: Article,
  author: Pick<Author, "slug" | "name"> | undefined,
  config: SiteConfig,
  categoryName = article.category,
) {
  const canonical = `${config.origin}${articleUrl(article)}`;
  const articleNode: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: article.title,
    description: article.seoDescription || article.dek,
    image: `${config.origin}/images/${article.image}.webp`,
    author: {
      "@type": "Person",
      name: author?.name ?? "SUGARMENU Editors",
      url: `${config.origin}/authors/${author?.slug ?? article.authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${config.origin}/logo.svg`,
      },
    },
    mainEntityOfPage: canonical,
  };
  if (article.publishedAt) articleNode.datePublished = article.publishedAt;
  const modified = article.updatedAt || article.publishedAt;
  if (modified) articleNode.dateModified = modified;
  const graph: Record<string, unknown>[] = [
    articleNode,
    breadcrumbStructuredData(
      [
        { name: "Home", path: "/" },
        { name: categoryName, path: `/${article.category}` },
        { name: article.title, path: articleUrl(article) },
      ],
      config,
    ),
  ];
  if (article.category === "glproud") {
    const medical: Record<string, unknown> = {
      "@type": "MedicalWebPage",
      "@id": `${canonical}#medical`,
      url: canonical,
      name: article.title,
      description: article.seoDescription || article.dek,
      isPartOf: { "@id": `${config.origin}/#website` },
    };
    if (hasClinicalReviewer(article)) {
      medical.reviewedBy = reviewerPerson(article.reviewer);
      if (
        article.reviewer.reviewedAt &&
        !Number.isNaN(new Date(article.reviewer.reviewedAt).getTime())
      ) {
        medical.lastReviewed = article.reviewer.reviewedAt;
      }
    }
    graph.push(medical);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function faqStructuredData(
  faq: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function llmsText(
  config: SiteConfig,
  data: SiteData,
  full = false,
): string {
  if (!config.indexable) {
    return [
      `# ${SITE_NAME}`,
      `> ${SITE_TAGLINE}`,
      "",
      "This site is not available for indexing or answer-engine use.",
      "Publication, medical review, and crawler policy are not approved for launch.",
      "",
    ].join("\n");
  }
  const lines = [
    `# ${SITE_NAME}`,
    `> ${SITE_TAGLINE}`,
    "",
    "SUGARMENU is a lifestyle-first editorial publication. GLProud is its GLP-1 Guide.",
    "GLProud drafts are unreviewed. No clinical reviewer is on file. Nothing here is individual medical advice.",
    "",
    "## Sections",
  ];
  for (const section of data.categories) {
    if (DEMO_SECTIONS.has(section.slug)) continue;
    lines.push(
      `- [${section.name}](${config.origin}/${section.slug}): ${section.description}`,
    );
  }
  lines.push("", "## GLP-1 Guide", "These pages are unreviewed drafts.");
  for (const article of data.articles.filter(
    (item) => item.category === "glproud",
  )) {
    lines.push(
      `- [${article.title}](${config.origin}${articleUrl(article)}): ${article.seoDescription}`,
    );
    if (full) lines.push(`  ${article.shortVersion}`);
  }
  lines.push(
    "",
    "## Policies",
    `- [About](${config.origin}/about)`,
    `- [Editorial standards](${config.origin}/editorial-standards)`,
    `- [Medical review policy](${config.origin}/medical-review)`,
    `- [Corrections](${config.origin}/corrections)`,
    "",
  );
  if (full) {
    lines.push("## Stories", "Draft stories are not cleared for citation.");
    for (const article of data.articles) {
      const state = isPublishedArticle(article)
        ? "Published"
        : "Draft, not published";
      lines.push(
        `- [${article.title}](${config.origin}${articleUrl(article)}) (${state}): ${article.dek}`,
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

export function categoryCrumbs(section: Pick<Section, "name" | "slug">) {
  return [
    { name: "Home", path: "/" },
    { name: section.name, path: `/${section.slug}` },
  ];
}
