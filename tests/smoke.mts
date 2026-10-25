import assert from "node:assert/strict";
import { content } from "../src/content/repository.ts";

// Run against `npm start` after a production build. Override for another local port.
const origin = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  ...(await content.getSections()).map((section) => `/${section.slug}`),
  "/the-sugar-dish",
  "/extra-sugar",
  ...(await content.getArticles()).map((article) => `/stories/${article.slug}`),
];

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal(
    (html.match(/<h1[ >]/g) ?? []).length,
    1,
    `${route}: one heading`,
  );
  assert.match(html, /noindex, nofollow/, `${route}: sample indexing policy`);
  assert.match(html, /id="main-content"/, `${route}: skip link target`);
}
for (const route of [
  "/not-a-section",
  "/stories/not-a-story",
  "/nested/missing",
]) {
  assert.equal((await fetch(new URL(route, origin))).status, 404, route);
}
const health = await fetch(new URL("/api/health", origin));
assert.equal(health.status, 200);
assert.equal(health.headers.get("cache-control"), "no-store");
assert.deepEqual(await health.json(), { status: "ok" });
const robots = await fetch(new URL("/robots.txt", origin));
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Disallow: \//);
console.log(
  `PASS: ${routes.length} content routes, 3 HTTP 404s, health and robots`,
);
