import Link from "next/link";
import { content } from "@/content/repository";
import { StoryCard } from "@/components/story-card";
export const metadata = {
  title: "All stories",
  description: "A little more life. Explore the SUGARMENU reading room.",
};
export default async function Stories({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const articles = await content.getArticles(category);
  const categories = (await content.getSections()).slice(0, 8);
  return (
    <>
      <header className="page-intro">
        <span className="kicker">Something for every appetite</span>
        <h1>The reading room</h1>
        <p>Good stories. Fresh perspectives. A little more life.</p>
      </header>
      <section className="inner-shell">
        <nav className="topic-filters" aria-label="Filter by category">
          <Link href="/stories" aria-current={!category ? "page" : undefined}>
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/stories?category=${c.slug}`}
              aria-current={category === c.slug ? "page" : undefined}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <p className="result-count">
          {articles.length} stories · Original launch drafts
        </p>
        <div className="story-grid three">
          {articles.map((a) => (
            <StoryCard
              key={a.slug}
              article={a}
              categoryName={categories.find((c) => c.slug === a.category)?.name}
            />
          ))}
        </div>
        {!articles.length && (
          <p>
            No stories found. <Link href="/stories">Browse all stories →</Link>
          </p>
        )}
      </section>
    </>
  );
}
