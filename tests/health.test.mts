import assert from "node:assert/strict";
import test from "node:test";
import { GET } from "../src/app/api/health/route.ts";
import { robotsPolicy } from "../src/lib/seo.ts";
import { readSiteConfig } from "../src/lib/site.ts";

test("health probe exposes only liveness and cannot be cached", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("the sample-content scaffold opts out of crawling", () => {
  const policy = robotsPolicy(readSiteConfig({}));
  assert.equal(policy.rules[0]?.userAgent, "*");
  assert.equal(policy.rules[0]?.disallow, "/");
  assert.equal(policy.rules[1]?.disallow, "/");
  assert.match(policy.sitemap, /\/sitemap\.xml$/);
});
