import { expect, test } from "@playwright/test";

async function jsonLd(page: import("@playwright/test").Page) {
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(scripts.length).toBeGreaterThan(0);
  return scripts.map((script) => JSON.parse(script) as unknown);
}

test("home, category, and article expose canonical and social tags", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("SUGARMENU — Indulge Yourself.");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /http:\/\/localhost:3000\/?$/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "SUGARMENU — Indulge Yourself.",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    /.+/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /.+/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );

  await page.goto("/eye-candy");
  await expect(page).toHaveTitle("Eye Candy | SUGARMENU");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000/eye-candy",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Eye Candy | SUGARMENU",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    /\/eye-candy$/,
  );
  await expect(page.locator("nav[aria-label='Breadcrumb']")).toBeVisible();

  await page.goto("/eye-candy/black-cherry-is-your-new-neutral");
  await expect(page).toHaveTitle("Black Cherry, Your New Neutral | SUGARMENU");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000/eye-candy/black-cherry-is-your-new-neutral",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /.+/,
  );
  const blocks = await jsonLd(page);
  expect(JSON.stringify(blocks)).toContain("Article");
  expect(JSON.stringify(blocks)).not.toContain("MedicalWebPage");
});

test("GLP-1 article JSON-LD parses and has no reviewer when none is on file", async ({
  page,
}) => {
  await page.goto("/glproud/what-glp-one-medicines-actually-do");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /\| SUGARMENU$/,
  );
  const blocks = await jsonLd(page);
  const serialized = JSON.stringify(blocks);
  expect(serialized).toContain("MedicalWebPage");
  expect(serialized).not.toContain("reviewedBy");
  expect(serialized).not.toContain("lastReviewed");
  expect(page.getByText("Medically reviewed by")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveText(
    "What GLP-1 Medicines Actually Do.",
  );
});

test("blocked robots.txt names the sitemap and AI crawlers", async ({
  request,
}) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  expect(robots).toMatch(/Sitemap: /);
  expect(robots).toMatch(/GPTBot/);
  expect(robots).toMatch(/OAI-SearchBot/);
  expect(robots).toMatch(/ClaudeBot/);
  expect(robots).toMatch(/Google-Extended/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("/search");
  expect(sitemap).not.toContain("black-cherry");
});
