import assert from "node:assert/strict";
import test from "node:test";
import { aeoFieldExample } from "../src/content/aeo-fixtures.ts";
import { guideLinksBySlug } from "../src/content/guide-links.ts";
import { baseData } from "../src/content/fixtures.ts";
import { articleUrl } from "../src/content/repository.ts";
import { pageMetadata } from "../src/lib/metadata.ts";
import { canonicalPath, normalizePath } from "../src/lib/redirects.ts";
import {
  articleMetaTitle,
  articleStructuredData,
  faqStructuredData,
  hasClinicalReviewer,
  isQuickAnswerLength,
  llmsText,
  robotsPolicy,
  sitemapEntries,
  visibleFaq,
} from "../src/lib/seo.ts";
import { readSiteConfig } from "../src/lib/site.ts";

const blocked = readSiteConfig({});
const open = readSiteConfig({
  SITE_INDEXABLE: "true",
  SITE_URL: "https://sugarmenu.example",
});
const guide = baseData.articles.find(
  (article) => article.slug === "what-glp-one-medicines-actually-do",
)!;
const lifestyle = baseData.articles.find(
  (article) => article.slug === "black-cherry-is-your-new-neutral",
)!;
const author = baseData.authors[0];

test("indexing defaults to noindex and requires a canonical origin to open", () => {
  assert.equal(blocked.indexable, false);
  assert.equal(blocked.origin, "http://localhost:3000");
  assert.equal(blocked.aiCrawlers, "deny");
  assert.throws(() => readSiteConfig({ SITE_INDEXABLE: "true" }));
  const explicit = readSiteConfig({
    AI_CRAWLER_POLICY: "allow",
    SITE_URL: "https://sugarmenu.example",
  });
  assert.equal(explicit.indexable, false);
  assert.equal(explicit.aiCrawlers, "allow");
});

test("robots.txt follows the indexable flag and the AI crawler policy", () => {
  const closed = robotsPolicy(blocked);
  assert.equal(closed.sitemap, "http://localhost:3000/sitemap.xml");
  assert.deepEqual(closed.rules[0], { userAgent: "*", disallow: "/" });
  assert.ok(
    (closed.rules[1]?.userAgent as string[]).includes("GPTBot") &&
      (closed.rules[1]?.userAgent as string[]).includes("PerplexityBot") &&
      (closed.rules[1]?.userAgent as string[]).includes("ClaudeBot"),
  );
  assert.equal(closed.rules[1]?.disallow, "/");
  const opened = robotsPolicy(open);
  assert.equal(opened.rules[0]?.allow, "/");
  assert.deepEqual(opened.rules[0]?.disallow, ["/search", "/studio", "/api/"]);
  assert.equal(opened.rules[1]?.allow, "/");
  const denied = robotsPolicy({ ...open, aiCrawlers: "deny" });
  assert.equal(denied.rules[1]?.disallow, "/");
  assert.equal(denied.rules[0]?.allow, "/");
});

test("sitemap lists public routes only when indexable, and only published stories", () => {
  assert.deepEqual(sitemapEntries(blocked, baseData), []);
  const urls = sitemapEntries(open, baseData).map((entry) => entry.url);
  for (const path of [
    "/",
    "/eye-candy",
    "/glproud",
    "/stories",
    "/about",
    "/editorial-standards",
    "/medical-review",
    "/corrections",
    "/authors",
    "/authors/sugar-editors",
  ])
    assert.ok(urls.includes(`https://sugarmenu.example${path}`), path);
  for (const path of [
    "/search",
    "/studio",
    "/studio/preview",
    "/extra-sugar",
    "/the-sugar-dish",
    articleUrl(lifestyle),
    articleUrl(guide),
  ])
    assert.equal(
      urls.includes(`https://sugarmenu.example${path}`),
      false,
      path,
    );
  const published = sitemapEntries(open, {
    ...baseData,
    articles: baseData.articles.map((article) =>
      article.slug === lifestyle.slug
        ? {
            ...article,
            status: "published",
            publishedAt: "2026-01-15",
            updatedAt: "2026-02-01",
          }
        : article,
    ),
  });
  const entry = published.find((item) =>
    item.url.endsWith(articleUrl(lifestyle)),
  );
  assert.ok(entry?.lastModified);
  assert.equal(entry.lastModified.toISOString().slice(0, 10), "2026-02-01");
});

test("canonical metadata and social titles follow the flag", () => {
  const home = pageMetadata(
    {
      title: "SUGARMENU — Indulge Yourself.",
      description: "A lifestyle publication.",
      path: "/",
      absoluteTitle: true,
    },
    blocked,
  );
  assert.equal(home.alternates?.canonical, "/");
  assert.deepEqual(home.robots, { index: false, follow: false });
  assert.equal(home.openGraph?.title, "SUGARMENU — Indulge Yourself.");
  assert.equal(
    home.twitter && "card" in home.twitter ? home.twitter.card : undefined,
    "summary_large_image",
  );
  const story = pageMetadata(
    {
      title: articleMetaTitle(lifestyle),
      description: lifestyle.seoDescription,
      path: articleUrl(lifestyle),
      type: "article",
    },
    open,
  );
  assert.equal(story.alternates?.canonical, articleUrl(lifestyle));
  assert.deepEqual(story.robots, { index: true, follow: true });
  assert.equal(
    story.openGraph?.title,
    "Black Cherry, Your New Neutral | SUGARMENU",
  );
  const search = pageMetadata(
    {
      title: "Search",
      description: "Find a story.",
      path: "/search",
      index: false,
    },
    open,
  );
  assert.deepEqual(search.robots, { index: false, follow: false });
});

test("article JSON-LD is parseable and omits a reviewer unless one is on file", () => {
  const data = articleStructuredData(guide, author, open, "GLProud");
  const json = JSON.stringify(data);
  JSON.parse(json);
  assert.match(json, /"@type":"Article"/);
  assert.match(json, /"@type":"MedicalWebPage"/);
  assert.equal(json.includes("reviewedBy"), false);
  assert.equal(json.includes("lastReviewed"), false);
  assert.equal(json.includes("datePublished"), false);
  assert.equal(json.includes("FAQPage"), false);
  assert.equal(hasClinicalReviewer(guide), false);
  const reviewed = articleStructuredData(
    {
      ...guide,
      reviewer: {
        name: "Fixture Reviewer",
        url: "https://example.com/reviewer",
        reviewedAt: "2026-03-01",
      },
    },
    author,
    open,
    "GLProud",
  );
  const reviewedJson = JSON.stringify(reviewed);
  assert.match(reviewedJson, /reviewedBy/);
  assert.match(reviewedJson, /lastReviewed/);
  assert.equal(reviewedJson.includes("example.com/reviewer"), true);
  const fashion = JSON.stringify(
    articleStructuredData(lifestyle, author, open, "Eye Candy"),
  );
  assert.equal(fashion.includes("MedicalWebPage"), false);
  assert.match(fashion, /"headline":"Black Cherry Is Your New Neutral/);
});

test("optional quick answer and FAQ fields stay off the page until supplied", () => {
  assert.equal(isQuickAnswerLength(aeoFieldExample.quickAnswer), true);
  assert.equal(visibleFaq(lifestyle).length, 0);
  assert.equal(aeoFieldExample.reviewer, null);
  const faq = faqStructuredData(aeoFieldExample.faq);
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity.length, 2);
  assert.equal(faq.mainEntity[0]?.name, aeoFieldExample.faq[0]?.question);
});

test("slugs stay lowercase and legacy paths redirect once", () => {
  for (const article of baseData.articles) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(article.category, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
  assert.equal(
    canonicalPath("/stories/black-cherry-is-your-new-neutral"),
    "/eye-candy/black-cherry-is-your-new-neutral",
  );
  assert.equal(
    canonicalPath("/stories/the-situationship-exit-interview"),
    "/sweet-talk",
  );
  assert.equal(canonicalPath("/Eye-Candy/"), "/eye-candy");
  assert.equal(canonicalPath("/eye-candy"), null);
  assert.equal(
    normalizePath("/glproud/what-glp-one-medicines-actually-do/"),
    "/glproud/what-glp-one-medicines-actually-do",
  );
  for (const [slug, targets] of Object.entries(guideLinksBySlug)) {
    assert.ok(baseData.articles.some((article) => article.slug === slug));
    for (const target of targets) {
      const article = baseData.articles.find((item) => item.slug === target);
      assert.equal(article?.category, "glproud");
    }
  }
});

test("llms files stay closed until the site is indexable", () => {
  const closed = llmsText(blocked, baseData, true);
  assert.match(closed, /not available for indexing/);
  assert.equal(closed.includes("what-glp-one-medicines-actually-do"), false);
  const opened = llmsText(open, baseData, true);
  assert.match(opened, /GLProud/);
  assert.match(opened, /unreviewed/);
  assert.match(opened, /what-glp-one-medicines-actually-do/);
  assert.match(opened, /Editorial standards/);
});
