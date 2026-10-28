import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import {
  content,
  articleUrl,
  readingMinutes,
  searchArticles,
} from "../src/content/repository.ts";
import { baseData } from "../src/content/fixtures.ts";
import { validateStudio, moveItem } from "../src/lib/studio.ts";

test("the runtime preserves the kit content and every original asset", async () => {
  for (const [file, value] of [
    ["categories", baseData.categories],
    ["heroes", baseData.heroes],
    ["launch-articles", baseData.articles],
  ] as const)
    assert.deepEqual(
      value,
      JSON.parse(
        readFileSync(
          new URL(
            `../SugarMenu-Recreation-Kit/reference/${file}.json`,
            import.meta.url,
          ),
          "utf8",
        ),
      ),
    );
  assert.equal(baseData.categories.length, 10);
  assert.equal(baseData.heroes.length, 5);
  assert.equal(baseData.articles.length, 30);
  const routes = baseData.categories.map((s) => `/${s.slug}`);
  assert.equal(new Set(routes).size, 10);
  for (const slide of baseData.heroes) {
    assert.ok([...routes, "/stories"].includes(slide.href));
    for (const suffix of ["", "-sm", "-mobile"])
      assert.ok(
        existsSync(
          new URL(
            `../public/images/${slide.image}${suffix}.webp`,
            import.meta.url,
          ),
        ),
      );
  }
  for (const category of baseData.categories)
    assert.ok(
      existsSync(
        new URL(`../public/images/${category.image}.webp`, import.meta.url),
      ),
    );
});
test("draft articles retain provenance, nullable dates, review status and valid references", async () => {
  const articles = await content.getArticles();
  const slugs = new Set(articles.map((a) => a.slug));
  assert.equal(slugs.size, 30);
  for (const a of articles) {
    assert.ok(await content.getSection(a.category));
    assert.ok(a.sections.length);
    assert.ok(a.authorSlug);
    assert.equal(a.status, "draft");
    assert.equal(a.publishedAt, null);
    assert.match(a.imageCredit, /AI-generated/);
    assert.ok(readingMinutes(a) > 0);
    assert.ok(
      existsSync(new URL(`../public/images/${a.image}.webp`, import.meta.url)),
    );
    for (const slug of a.related) assert.ok(slugs.has(slug));
    assert.equal(await content.getArticle(a.slug, a.category), a);
    assert.equal(articleUrl(a), `/${a.category}/${a.slug}`);
    if (a.category === "glproud") {
      assert.equal(a.reviewStatus, "unreviewed");
      assert.ok(a.sources.length);
      assert.ok(!("medicalReview" in a));
    }
  }
});
test("lookups reject mismatched categories and distinguish empty results", async () => {
  assert.equal(await content.getSection("missing"), undefined);
  assert.equal(await content.getArticle("missing"), undefined);
  assert.equal(
    await content.getArticle("black-cherry-is-your-new-neutral", "sweet-talk"),
    undefined,
  );
  assert.deepEqual(await content.getArticles("missing"), []);
  for (const section of baseData.categories)
    assert.deepEqual(
      await content.getArticles(section.slug),
      baseData.articles.filter((a) => a.category === section.slug),
    );
});
test("keyword search is case-insensitive, prioritizes titles and handles empty input", () => {
  assert.equal(
    searchArticles("  BLACK CHERRY  ")[0]?.slug,
    "black-cherry-is-your-new-neutral",
  );
  assert.equal(
    searchArticles("phone boring")[0]?.slug,
    "make-your-phone-boring",
  );
  assert.deepEqual(searchArticles(""), []);
  assert.deepEqual(searchArticles("zzzz-no-such-story"), []);
  assert.ok(
    searchArticles("undertone").some(
      (a) => a.slug === "black-cherry-is-your-new-neutral",
    ),
  );
});
test("studio validates saved content and preserves required editorial metadata", () => {
  assert.ok(validateStudio(baseData));
  const data = structuredClone(baseData);
  data.articles[0].title = "An edited title";
  data.heroes = moveItem(data.heroes, 0, 1);
  assert.ok(validateStudio(data));
  assert.notEqual(data.articles[0].title, baseData.articles[0].title);
  data.ad.href = "javascript:alert(1)";
  assert.equal(validateStudio(data), false);
  data.ad.href = "/partnerships";
  data.articles.find((a) => a.category === "glproud")!.reviewStatus =
    "reviewed";
  assert.equal(validateStudio(data), false);
  const reviewed = structuredClone(baseData);
  reviewed.articles.find((a) => a.category === "glproud")!.reviewer = {
    name: "Not a supplied reviewer",
  };
  assert.equal(validateStudio(reviewed), false);
  assert.equal(validateStudio({}), false);
});
