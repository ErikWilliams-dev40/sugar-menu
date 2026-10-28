import { searchArticles } from "@/content/repository";
import { StoryCard } from "@/components/story-card";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "Search",
  description: "Find your next good read on SUGARMENU.",
  path: "/search",
  index: false,
});
export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q: suppliedQuery = "" } = await searchParams;
  const q = Array.isArray(suppliedQuery)
    ? (suppliedQuery[0] ?? "")
    : suppliedQuery;
  const query = q.trim();
  const results = searchArticles(query);
  return (
    <>
      <header className="page-intro">
        <span className="kicker">A little curiosity looks good on you</span>
        <h1>Search the menu</h1>
      </header>
      <section className="inner-shell">
        <form className="signup search-page-form" action="/search">
          <label htmlFor="query">Search stories</label>
          <div className="email-row">
            <input
              id="query"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Style, travel, a fresh start…"
            />
            <button className="button">Search →</button>
          </div>
        </form>
        <p className="result-count" role="status">
          {query
            ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`
            : "Enter a keyword to explore our stories."}
        </p>
        <h2 className="sr-only">Results</h2>
        <div className="story-grid three">
          {results.map((a) => (
            <StoryCard key={a.slug} article={a} />
          ))}
        </div>
        {query && !results.length && (
          <p className="notice">
            Nothing on the menu just yet. Try a broader word, such as style,
            travel or rest.
          </p>
        )}
      </section>
    </>
  );
}
