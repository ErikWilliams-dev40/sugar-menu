import articles from "../content/data/launch-articles.json" with { type: "json" };

const articlePaths = new Map(
  articles.map((article) => [
    article.slug,
    `/${article.category}/${article.slug}`,
  ]),
);

/** Retired scaffold sample. It is not one of the 30 launch drafts. */
const retiredStories = new Map<string, string>([
  ["the-situationship-exit-interview", "/sweet-talk"],
]);

export function normalizePath(path: string): string {
  const [pathname = "/", query] = path.split("?");
  let clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (clean.length > 1) clean = clean.replace(/\/+$/, "");
  clean = clean.toLowerCase();
  return query ? `${clean}?${query}` : clean;
}

function legacyStoryPath(path: string): string | null {
  const match = /^\/stories\/([^/]+)$/.exec(path);
  if (!match) return null;
  const slug = match[1] ?? "";
  return retiredStories.get(slug) ?? articlePaths.get(slug) ?? null;
}

/** Path to 301 to, or null when the request is already canonical. */
export function canonicalPath(pathname: string): string | null {
  if (!pathname.startsWith("/")) return null;
  let path = pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "");
  path = path.toLowerCase();
  const legacy = legacyStoryPath(path);
  if (legacy) path = legacy;
  return path === pathname ? null : path;
}
