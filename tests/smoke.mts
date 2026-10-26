import assert from "node:assert/strict";
import { content, articleUrl } from "../src/content/repository.ts";
import { utilityLinks } from "../src/content/utility.ts";
const origin = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  ...(await content.getSections()).map((s) => `/${s.slug}`),
  ...(await content.getArticles()).map(articleUrl),
  "/stories",
  "/search",
  "/search?q=black+cherry",
  ...utilityLinks.map((l) => l.href),
];
for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `${route}: one h1`);
  assert.match(html, /noindex, nofollow/);
  assert.match(html, /id="main-content"/);
}
for (const route of [
  "/not-a-section",
  "/stories/not-a-story",
  "/nested/missing",
  "/sweet-talk/black-cherry-is-your-new-neutral",
])
  assert.equal((await fetch(new URL(route, origin))).status, 404, route);
for (const [from, to] of [
  [
    "/stories/black-cherry-is-your-new-neutral",
    "/eye-candy/black-cherry-is-your-new-neutral",
  ],
  ["/stories/the-situationship-exit-interview", "/sweet-talk"],
]) {
  const response = await fetch(new URL(from, origin), { redirect: "manual" });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), to);
}
const health = await fetch(new URL("/api/health", origin));
assert.equal(health.status, 200);
assert.equal(health.headers.get("cache-control"), "no-store");
assert.deepEqual(await health.json(), { status: "ok" });
assert.match(
  await (await fetch(new URL("/robots.txt", origin))).text(),
  /Disallow: \//,
);
console.log(
  `PASS: ${routes.length} public routes, 4 HTTP 404s, 2 redirects, health and robots`,
);
