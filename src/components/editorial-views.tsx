import Link from "next/link";
import type { Article, Section, SiteData } from "@/content/types";
import { guideArticleSlugs } from "@/content/guide-links";
import { articleUrl, readingMinutes } from "@/content/repository";
import { normalizePath } from "@/lib/redirects";
import {
  articleStructuredData,
  categoryCrumbs,
  collectionStructuredData,
  faqStructuredData,
  formatDate,
  hasClinicalReviewer,
  visibleFaq,
} from "@/lib/seo";
import { readSiteConfig } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { EditorialImage } from "./editorial-image";
import { JsonLd } from "./json-ld";
import { StoryCard } from "./story-card";
import { SignupForm } from "./signup-form";
import { HeroCarousel } from "./hero-carousel";
import { TrackedLink, TrackView } from "./track";
export const medicalNotice =
  "Medical review required. Resources are in editorial development.";
export function MedicalNotice() {
  return (
    <aside className="notice">
      <strong>{medicalNotice}</strong>
      <p>
        General information only; these unreviewed drafts are not individual
        medical advice. Discuss your care with a qualified clinician or
        pharmacist.{" "}
        <Link href="/medical-disclaimer">Read the medical disclaimer →</Link>
      </p>
    </aside>
  );
}
export function DishPreview() {
  return (
    <div className="dish-preview">
      <span className="kicker">
        A taste of what’s coming · sample conversations
      </span>
      <p>“I booked the solo trip. Now what do I pack?”</p>
      <p>“A first date that wasn’t a job interview.”</p>
      <p>“The small win I’m making a big deal of.”</p>
      <span className="meta">
        Preview only. Member conversations open in phase two.
      </span>
    </div>
  );
}
export function Newsletter({ inline = false }: { inline?: boolean }) {
  return inline ? (
    <aside className="inline-newsletter">
      <h3>A little Extra Sugar.</h3>
      <p>The best stories, excellent distractions, and your next good idea.</p>
      <SignupForm />
    </aside>
  ) : (
    <section className="newsletter-band">
      <div>
        <span className="kicker">A little extra. Just for you.</span>
        <h2>Extra Sugar</h2>
        <p>
          The best stories, excellent distractions, and your next good idea.
        </p>
      </div>
      <SignupForm />
    </section>
  );
}
const trendingSlugs = [
  "black-cherry-is-your-new-neutral",
  "make-your-phone-boring",
  "rest-is-not-a-reward",
  "five-piece-capsule-real-life",
  "drugstore-skincare-that-earns-its-place",
];
export function HomeView({
  data,
  preview = false,
}: {
  data: SiteData;
  preview?: boolean;
}) {
  const storyHref = (a: Article) =>
    preview
      ? `/studio/preview?article=${encodeURIComponent(a.slug)}`
      : articleUrl(a);
  const name = (a: Article) =>
    data.categories.find((c) => c.slug === a.category)?.name;
  const feature = data.articles.find(
    (a) => a.slug === "walkable-city-long-weekend",
  );
  function render(id: string) {
    const category = data.categories.find((c) => c.slug === id);
    if (
      category &&
      !["glproud", "the-sugar-dish", "extra-sugar"].includes(id)
    ) {
      const articles = data.articles.filter((a) => a.category === id);
      const [lead, ...others] = articles;
      return (
        <section className="page-shell magazine-section">
          <div className="section-title">
            <div>
              <h2>{category.name}</h2>
              <span className="kicker">{category.topics.join(" · ")}</span>
            </div>
            <Link className="text-link" href={`/${id}`}>
              All {category.name} →
            </Link>
          </div>
          {lead && (
            <div className="category-editorial">
              <StoryCard
                article={lead}
                categoryName={category.name}
                href={storyHref(lead)}
              />
              <div className="secondary-stories">
                {others.map((a) => (
                  <StoryCard
                    key={a.slug}
                    article={a}
                    compact
                    categoryName={category.name}
                    href={storyHref(a)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      );
    }
    switch (id) {
      case "hero":
        return (
          <HeroCarousel
            slides={data.heroes}
            seconds={data.publication.heroSeconds}
          />
        );
      case "categories":
        return (
          <section className="page-shell" aria-label="The menu">
            <div className="category-grid">
              {data.categories.map((c) => (
                <Link
                  className="category-card"
                  key={c.slug}
                  href={`/${c.slug}`}
                >
                  <div className="category-photo">
                    <EditorialImage name={c.image} />
                    <h2>
                      {c.slug === "glproud" ? (
                        <>
                          GL<em>Proud</em>
                        </>
                      ) : (
                        c.name
                      )}
                    </h2>
                  </div>
                  <div className="category-body">
                    <span className="kicker">{c.topics.join(". ")}.</span>
                    <p>{c.description}</p>
                    <span className="text-link">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      case "just-in":
        return (
          <section className="page-shell magazine-section">
            <div className="section-title">
              <h2>Just In</h2>
              <Link className="text-link" href="/stories">
                All stories →
              </Link>
            </div>
            <div className="just-in">
              {data.articles
                .filter((a) => a.category === "eye-candy")
                .slice(0, 4)
                .map((a) => (
                  <article key={a.slug}>
                    <span className="kicker">Eye Candy · {a.topic}</span>
                    <h3>
                      <Link href={storyHref(a)}>{a.title}</Link>
                    </h3>
                    <p>{a.dek}</p>
                  </article>
                ))}
            </div>
          </section>
        );
      case "featured":
        return (
          feature && (
            <section className="long-read">
              <div className="long-photo">
                <EditorialImage name="hero-2" />
                <span>Somewhere better. Starting with you.</span>
              </div>
              <div>
                <span className="eyebrow">The featured edit</span>
                <h2>{feature.title}</h2>
                <p>{feature.dek}</p>
                <Link className="button" href={storyHref(feature)}>
                  Make a little time for this →
                </Link>
              </div>
            </section>
          )
        );
      case "trending":
        return (
          <section className="page-shell magazine-section trending">
            <div className="section-title">
              <h2>Trending Now</h2>
            </div>
            {trendingSlugs.map((slug, i) => {
              const a = data.articles.find((a) => a.slug === slug);
              return (
                a && (
                  <Link className="trend-item" key={slug} href={storyHref(a)}>
                    <span className="number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{a.title}</h3>
                      <span className="kicker">{name(a)}</span>
                    </div>
                  </Link>
                )
              );
            })}
          </section>
        );
      case "community":
        return (
          <section className="dish-band">
            <div>
              <span className="eyebrow">
                Your next chapter deserves good company.
              </span>
              <h2>The Sugar Dish</h2>
              <p>
                Honest conversations. Excellent recommendations. People who get
                it. Our community is taking shape — and there’s a seat with your
                name on it.
              </p>
              <Link className="button" href="/the-sugar-dish#signup">
                Save me a seat →
              </Link>
            </div>
            <DishPreview />
          </section>
        );
      case "newsletter":
        return <Newsletter />;
      case "glproud":
        return (
          <div className="page-shell">
            <section className="glproud-strip">
              <div>
                <span className="kicker">Knowledge. Without the judgment.</span>
                <h2>
                  GL<em>Proud</em>
                </h2>
                <p>Your life is bigger than a prescription.</p>
              </div>
              <div>
                <TrackedLink
                  href="/glproud/what-glp-one-medicines-actually-do"
                  event={{
                    name: "glp1_guide_engagement",
                    slug: "what-glp-one-medicines-actually-do",
                    surface: "module",
                  }}
                >
                  What GLP-1 Medicines Actually Do. →
                </TrackedLink>
                <span className="meta">{medicalNotice}</span>
              </div>
              <TrackedLink
                className="button"
                href="/glproud"
                event={{ name: "glp1_guide_engagement", surface: "module" }}
              >
                Meet GLProud →
              </TrackedLink>
            </section>
          </div>
        );
      case "ad":
        return (
          <div className="page-shell">
            <aside className="house-ad">
              <span className="meta">SUGARMENU house ad</span>
              <div>
                <span className="kicker">{data.ad.eyebrow}</span>
                <h2>{data.ad.title}</h2>
                <TrackedLink
                  className="text-link"
                  href={data.ad.href}
                  event={{
                    name: "sponsored_placement_click",
                    href: data.ad.href,
                    label: data.ad.title,
                  }}
                >
                  {data.ad.cta} →
                </TrackedLink>
              </div>
            </aside>
          </div>
        );
      case "closing":
        return (
          <section className="closing-banner">
            <EditorialImage name="hero-2" />
            <div>
              <p className="eyebrow">Your next chapter looks delicious.</p>
              <h2>More Good Days Ahead.</h2>
            </div>
            <Link className="button" href="/the-sugar-dish">
              Pull up a chair →
            </Link>
          </section>
        );
      default:
        return null;
    }
  }
  return (
    <>
      {!data.modules.some((m) => m.id === "hero" && m.visible) && (
        <h1 className="sr-only">SUGARMENU</h1>
      )}
      {data.modules
        .filter((m) => m.visible)
        .map((m) => (
          <div key={m.id} data-module={m.id}>
            {render(m.id)}
          </div>
        ))}
    </>
  );
}
export function CategoryView({
  category,
  articles,
  topic = "",
}: {
  category: Section;
  articles: readonly Article[];
  topic?: string;
}) {
  const filtered = topic ? articles.filter((a) => a.topic === topic) : articles;
  const crumbs = categoryCrumbs(category);
  return (
    <>
      <TrackView
        event={{
          name: "category_engagement",
          category: category.slug,
          ...(topic ? { topic } : {}),
        }}
      />
      {category.slug === "glproud" && (
        <TrackView
          event={{ name: "glp1_guide_engagement", surface: "front" }}
        />
      )}
      <JsonLd
        data={collectionStructuredData(
          {
            name: category.name,
            description: category.description,
            path: `/${category.slug}`,
            crumbs,
          },
          readSiteConfig(),
        )}
      />
      <Breadcrumbs items={crumbs} />
      <section className="category-banner">
        <div>
          <span className="eyebrow">{category.topics.join(" · ")}</span>
          <h1>
            {category.slug === "glproud" ? (
              <>
                GL<em>Proud</em>
              </>
            ) : (
              category.name
            )}
          </h1>
          <p>{category.description}</p>
        </div>
        <EditorialImage
          name={category.image}
          eager
          sizes="(max-width: 800px) 100vw, 50vw"
        />
      </section>
      <div className="inner-shell">
        {category.slug === "glproud" && <MedicalNotice />}
        <nav className="topic-filters" aria-label="Filter by topic">
          <Link
            href={`/${category.slug}`}
            aria-current={!topic ? "page" : undefined}
          >
            All
          </Link>
          {category.topics.map((t) => (
            <Link
              key={t}
              href={`/${category.slug}?topic=${encodeURIComponent(t)}`}
              aria-current={topic === t ? "page" : undefined}
            >
              {t}
            </Link>
          ))}
        </nav>
        <p className="result-count">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          {topic ? ` · ${topic}` : ""}
        </p>
        <h2 className="sr-only">{category.name} stories</h2>
        <div className="story-grid three">
          {filtered.map((a) => (
            <StoryCard key={a.slug} article={a} categoryName={category.name} />
          ))}
        </div>
        {!filtered.length && (
          <p className="notice">
            No stories in this topic yet.{" "}
            <Link href={`/${category.slug}`}>
              Explore all {category.name} stories →
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
function linkLabel(path: string, data: SiteData) {
  const article = data.articles.find((item) => articleUrl(item) === path);
  if (article) return article.title;
  const section = data.categories.find((item) => `/${item.slug}` === path);
  return section?.name ?? path;
}
export function ArticleView({
  article,
  data,
  preview = false,
}: {
  article: Article;
  data: SiteData;
  preview?: boolean;
}) {
  const category = data.categories.find((c) => c.slug === article.category);
  const author = data.authors.find((a) => a.slug === article.authorSlug);
  const related = article.related
    .map((slug) => data.articles.find((a) => a.slug === slug))
    .filter((a): a is Article => !!a);
  const quick = article.quickAnswer?.trim();
  const faq = visibleFaq(article);
  const reviewer = hasClinicalReviewer(article) ? article.reviewer : undefined;
  const crumbs = [
    { name: "Home", path: "/" },
    {
      name: category?.name ?? article.category,
      path: `/${article.category}`,
    },
    { name: article.title, path: articleUrl(article) },
  ];
  const reading = article.internalLinks
    .map(normalizePath)
    .filter((path, index, all) => all.indexOf(path) === index)
    .filter((path) => path !== articleUrl(article))
    .map((path) => ({ href: path, label: linkLabel(path, data) }));
  const guide =
    article.category === "glproud"
      ? []
      : guideArticleSlugs(article.slug)
          .map((slug) => data.articles.find((item) => item.slug === slug))
          .filter((item): item is Article => !!item);
  const config = readSiteConfig();
  return (
    <article>
      {!preview && (
        <>
          <TrackView
            event={{
              name: "article_view",
              slug: article.slug,
              category: article.category,
            }}
          />
          {article.category === "glproud" && (
            <TrackView
              event={{
                name: "glp1_guide_engagement",
                slug: article.slug,
                surface: "article",
              }}
            />
          )}
          <JsonLd
            data={articleStructuredData(
              article,
              author,
              config,
              category?.name,
            )}
          />
          {faq.length > 0 && <JsonLd data={faqStructuredData(faq)} />}
        </>
      )}
      <Breadcrumbs className="article-breadcrumb" items={crumbs} />
      <header className="article-head">
        <span className="kicker">
          {category?.name} · {article.topic}
        </span>
        <h1>{article.title}</h1>
        {quick && (
          <aside className="quick-answer" aria-label="Quick answer">
            <h2>Quick answer</h2>
            <p>{quick}</p>
          </aside>
        )}
        <p>{article.dek}</p>
        <div className="meta byline">
          By{" "}
          {author ? (
            <Link href={`/authors/${author.slug}`}>{author.name}</Link>
          ) : (
            "SUGARMENU Editors"
          )}
          {" · "}
          {readingMinutes(article)} min read
        </div>
        <p className="meta dates">
          Published{" "}
          {article.publishedAt ? (
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          ) : (
            <span>Not yet published</span>
          )}
          {" · "}
          Updated{" "}
          {article.updatedAt ? (
            <time dateTime={article.updatedAt}>
              {formatDate(article.updatedAt)}
            </time>
          ) : (
            <span>Not yet updated</span>
          )}
        </p>
        {reviewer && (
          <p className="meta review-line">
            Medically reviewed by{" "}
            {reviewer.url && /^https:\/\//.test(reviewer.url) ? (
              <a href={reviewer.url} rel="noopener noreferrer">
                {reviewer.name}
              </a>
            ) : (
              reviewer.name
            )}
            {reviewer.reviewedAt && (
              <>
                {" "}
                on{" "}
                <time dateTime={reviewer.reviewedAt}>
                  {formatDate(reviewer.reviewedAt)}
                </time>
              </>
            )}
          </p>
        )}
        <span className="status-badge">
          Original launch draft
          {article.category === "glproud" ? " · Unreviewed" : ""}
        </span>
      </header>
      <figure className="article-photo">
        <EditorialImage
          name={article.image}
          alt={article.alt}
          eager
          sizes="(max-width: 1100px) 100vw, 1100px"
        />
        <figcaption>{article.imageCredit}</figcaption>
      </figure>
      <div className="article-layout">
        <aside className="article-share">
          <Link className="text-link" href={`/${article.category}`}>
            More {category?.name} →
          </Link>
        </aside>
        <div className="article-body">
          {article.category === "glproud" && <MedicalNotice />}
          <aside className="short-version">
            <span className="kicker">The short version</span>
            <p>{article.shortVersion}</p>
          </aside>
          {article.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              {s.text.split(/\n\n/).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {i === 1 && article.takeaways[0] && (
                <blockquote>{article.takeaways[0]}</blockquote>
              )}
              {i === 2 && <Newsletter inline />}
            </section>
          ))}
          <aside className="takeaways">
            <h2>A little to take with you</h2>
            <ul>
              {article.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>
          {faq.length > 0 && (
            <section className="article-faq" aria-label="Questions">
              {faq.map((item) => (
                <section key={item.question}>
                  <h2>{item.question}</h2>
                  <p>{item.answer}</p>
                </section>
              ))}
            </section>
          )}
          {article.sources.length > 0 && (
            <section className="source-list">
              <h2>Sources & further reading</h2>
              <ul>
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener noreferrer">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {reading.length > 0 && (
            <section className="guide-links">
              <h2>
                {article.category === "glproud"
                  ? "In the GLP-1 Guide"
                  : "Keep reading"}
              </h2>
              <ul>
                {reading.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {guide.length > 0 && (
            <aside className="guide-links">
              <h2>From the GLP-1 Guide</h2>
              <p>
                GLProud is a separate, unreviewed draft guide. It is general
                information, not a review of this story and not medical advice.
              </p>
              <ul>
                {guide.map((item) => (
                  <li key={item.slug}>
                    <TrackedLink
                      href={articleUrl(item)}
                      event={{
                        name: "glp1_guide_engagement",
                        slug: item.slug,
                        surface: "crosslink",
                      }}
                    >
                      {item.title}
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <aside className="author-box">
            <h3>
              {author ? (
                <Link href={`/authors/${author.slug}`}>{author.name}</Link>
              ) : (
                "SUGARMENU Editors"
              )}
            </h3>
            <p>
              {author?.bio ??
                "Original launch drafts from the SUGARMENU editorial preview."}
            </p>
            {author?.expertise && <p>{author.expertise}</p>}
          </aside>
        </div>
      </div>
      <section className="inner-shell">
        <div className="section-title">
          <h2>A little more on the menu</h2>
        </div>
        <div className="story-grid three">
          {related.map((a) => (
            <StoryCard
              key={a.slug}
              article={a}
              href={preview ? `/studio/preview?article=${a.slug}` : undefined}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
