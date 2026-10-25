import assert from "node:assert/strict";
import test from "node:test";
import { content } from "../src/content/repository.ts";

test("all navigation and hero destinations resolve to unique known routes", async () => {
  const sections = await content.getSections();
  const slides = await content.getHeroSlides();
  const routes = sections.map((section) => `/${section.slug}`);
  routes.push("/the-sugar-dish", "/extra-sugar");
  assert.equal(new Set(routes).size, routes.length);
  for (const section of sections) {
    assert.match(section.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal((await content.getSection(section.slug))?.name, section.name);
  }
  assert.equal(slides.length, 5);
  assert.equal(new Set(slides.map((slide) => slide.id)).size, slides.length);
  for (const slide of slides)
    assert.ok(routes.includes(slide.href), slide.href);
});

test("editorial fixtures have valid references and review attribution for GLProud", async () => {
  const articles = await content.getArticles();
  const slugs = new Set(articles.map((article) => article.slug));
  assert.equal(slugs.size, articles.length);
  for (const article of articles) {
    assert.ok(await content.getSection(article.section), article.section);
    assert.ok(article.body.length > 0);
    assert.ok(article.author.name);
    assert.ok(Number.isInteger(article.readMinutes) && article.readMinutes > 0);
    assert.ok(Number.isFinite(Date.parse(article.publishedAt)));
    assert.ok(Date.parse(article.updatedAt) >= Date.parse(article.publishedAt));
    for (const related of article.relatedSlugs)
      assert.ok(slugs.has(related), related);
    if (article.section === "glproud") {
      assert.ok(article.medicalReview?.name);
      assert.ok(article.medicalReview?.credential);
      assert.ok(
        Number.isFinite(Date.parse(article.medicalReview?.reviewedAt ?? "")),
      );
    }
  }
});

test("content lookup distinguishes unknown routes from empty sections", async () => {
  assert.equal(await content.getSection("not-a-section"), undefined);
  assert.equal(await content.getArticle("not-a-story"), undefined);
  assert.deepEqual(await content.getArticles("not-a-section"), []);
  const articles = await content.getArticles();
  for (const section of await content.getSections()) {
    assert.deepEqual(
      await content.getArticles(section.slug),
      articles.filter((article) => article.section === section.slug),
    );
  }
});
