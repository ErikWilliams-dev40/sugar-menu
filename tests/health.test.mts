import assert from "node:assert/strict";
import test from "node:test";
import { GET } from "../src/app/api/health/route.ts";
import robots from "../src/app/robots.ts";

test("health probe exposes only liveness and cannot be cached", async () => {
  const response = GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("the sample-content scaffold opts out of crawling", () => {
  assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
});
