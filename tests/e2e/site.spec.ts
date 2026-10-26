import { test, expect, type Page } from "@playwright/test";
async function dismissPrivacy(page: Page) {
  await page
    .getByRole("button", { name: "Reject analytics", exact: true })
    .click();
}
test("all homepage modules and the category/article reading flow", async ({
  page,
}) => {
  await page.goto("/");
  await dismissPrivacy(page);
  await expect(page.locator("[data-module]")).toHaveCount(17);
  await expect(page.locator(".category-grid .category-card")).toHaveCount(10);
  await expect(page.locator("h1")).toHaveCount(1);
  await page.locator(".category-card").filter({ hasText: "Eye Candy" }).click();
  await expect(page).toHaveURL("/eye-candy");
  await page.getByRole("link", { name: "Beauty", exact: true }).click();
  await expect(page).toHaveURL(/topic=Beauty/);
  await expect(page.locator(".story")).toHaveCount(1);
  await page
    .getByRole("link", {
      name: "Your Skin Does Not Read Price Tags.",
      exact: true,
    })
    .click();
  await expect(page.locator("h1")).toHaveText(
    "Your Skin Does Not Read Price Tags.",
  );
  await expect(page.locator(".takeaways")).toBeVisible();
  await expect(page.locator(".article-photo figcaption")).toContainText(
    "AI-generated",
  );
  await page.goto("/glproud/what-glp-one-medicines-actually-do");
  await expect(
    page.getByText(
      "Medical review required. Resources are in editorial development.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.locator(".source-list a")).toHaveCount(4);
});
test("carousel supports timing, focus/hover pause, manual controls and reduced motion", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await dismissPrivacy(page);
  await page.mouse.move(0, 0);
  await page.clock.runFor(7100);
  await expect(page.locator(".slide-count")).toHaveText("2 of 5");
  await page.locator(".hero-slide.active .hero-copy").hover();
  await page.clock.runFor(8000);
  await expect(page.locator(".slide-count")).toHaveText("2 of 5");
  await page.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(page.locator(".slide-count")).toHaveText("3 of 5");
  await page.mouse.move(0, 0);
  await page.getByRole("button", { name: "Next slide", exact: true }).blur();
  await page.clock.runFor(8000);
  await expect(page.locator(".slide-count")).toHaveText("3 of 5");
  await page.getByRole("button", { name: "Show slide 1", exact: true }).click();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".slide-count")).toHaveText("5 of 5");
  await page.getByRole("button", { name: "Resume slideshow" }).click();
  await page.clock.runFor(8000);
  await expect(page.locator(".slide-count")).toHaveText("5 of 5");
  await page.getByRole("button", { name: "Pause slideshow" }).blur();
  await page.mouse.move(0, 0);
  await page.clock.runFor(7100);
  await expect(page.locator(".slide-count")).toHaveText("1 of 5");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pause")).toBeDisabled();
  await page.clock.runFor(15000);
  await expect(page.locator(".slide-count")).toHaveText("1 of 5");
});
test("carousel pauses when hidden and supports horizontal swipes", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  await dismissPrivacy(page);
  await page.mouse.move(0, 0);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.clock.runFor(15000);
  await expect(page.locator(".slide-count")).toHaveText("1 of 5");
  await page.locator(".hero").evaluate((hero) => {
    const start = new Touch({
      identifier: 1,
      target: hero,
      clientX: 300,
      clientY: 300,
    });
    const end = new Touch({
      identifier: 1,
      target: hero,
      clientX: 100,
      clientY: 310,
    });
    hero.dispatchEvent(
      new TouchEvent("touchstart", { bubbles: true, touches: [start] }),
    );
    hero.dispatchEvent(
      new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }),
    );
  });
  await expect(page.locator(".slide-count")).toHaveText("2 of 5");
});
test("mobile menu and search support keyboard dismissal and result navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await dismissPrivacy(page);
  const menuButton = page.getByRole("button", { name: "Menu" });
  await menuButton.click();
  await expect(page.getByRole("dialog", { name: "On the menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  const searchButton = page.getByRole("button", {
    name: "Search",
    exact: true,
  });
  await searchButton.click();
  await expect(
    page.getByRole("dialog", { name: "What’s on your mind?" }),
  ).toBeVisible();
  await page.getByLabel("Search SUGARMENU").fill("BLACK CHERRY");
  await page.getByRole("button", { name: "Search →", exact: true }).click();
  await expect(page).toHaveURL(/\/search\?q=BLACK\+CHERRY/);
  await expect(page.locator(".story").first()).toContainText(
    "Black Cherry Is Your New Neutral",
  );
  await page.getByLabel("Search stories").fill("no-such-word-zzzzz");
  await page.getByRole("button", { name: "Search →", exact: true }).click();
  await expect(
    page.getByText("0 results for “no-such-word-zzzzz”"),
  ).toBeVisible();
  await page.goto("/search?q=black&q=cherry");
  await expect(page.getByLabel("Search stories")).toHaveValue("black");
  await expect(page.locator(".story").first()).toContainText(
    "Black Cherry Is Your New Neutral",
  );
});
test("newsletter and community demo forms validate, persist and deduplicate", async ({
  page,
}) => {
  await page.goto("/extra-sugar");
  await dismissPrivacy(page);
  await page.getByRole("button", { name: "Sign me up →", exact: true }).click();
  await expect(
    page.getByRole("main").getByRole("alert").filter({ hasText: /\S/ }),
  ).toContainText("valid email");
  await page.getByLabel("Email address").fill("reader@example.test");
  await page.getByRole("button", { name: "Sign me up →", exact: true }).click();
  await expect(
    page.getByRole("main").getByRole("alert").filter({ hasText: /\S/ }),
  ).toContainText("consent");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Sign me up →", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Saved in this browser only",
  );
  await page.reload();
  await page.getByLabel("Email address").fill("READER@example.test");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Sign me up →", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("already saved");
  await page.goto("/the-sugar-dish");
  await page.getByLabel("Email address").fill("reader@example.test");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Save me a seat →", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("no live account");
  const records = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("sugarmenu:submissions:v1") ?? "[]"),
  );
  expect(records).toHaveLength(2);
});
test("storage failure never claims a signup succeeded", async ({ page }) => {
  await page.goto("/extra-sugar");
  await dismissPrivacy(page);
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Quota exceeded");
    };
  });
  await page.getByLabel("Email address").fill("reader@example.test");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Sign me up →", exact: true }).click();
  await expect(
    page.getByRole("main").getByRole("alert").filter({ hasText: /\S/ }),
  ).toContainText("Nothing was sent");
});
test("privacy preferences persist and can be reopened", async ({ page }) => {
  await page.goto("/");
  await dismissPrivacy(page);
  await page.reload();
  await expect(page.locator(".cookie-choice")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Cookie preferences", exact: true })
    .click();
  await page.getByRole("button", { name: "Preferences", exact: true }).click();
  await page
    .getByRole("checkbox", {
      name: "Allow optional anonymous analytics when available",
    })
    .check();
  await page
    .getByRole("button", { name: "Save preferences", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("sugarmenu:consent:v1")!).analytics,
    ),
  ).toBe(true);
});
test("studio edits affect only the saved preview and reset restores the kit", async ({
  page,
  context,
}) => {
  await page.goto("/studio");
  await dismissPrivacy(page);
  await expect(
    page.getByText("Local workspace ready", { exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("Article title", { exact: true })
    .fill("A separate studio headline");
  await expect(
    page.getByText("Unsaved changes", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Save local edits" }).click();
  await expect(page.getByRole("status")).toContainText("Saved in this browser");
  const preview = await context.newPage();
  await preview.goto(
    "/studio/preview?article=black-cherry-is-your-new-neutral",
  );
  await expect(preview.locator("h1")).toHaveText("A separate studio headline");
  const original = await context.newPage();
  await original.goto("/eye-candy/black-cherry-is-your-new-neutral");
  await expect(original.locator("h1")).toHaveText(
    "Black Cherry Is Your New Neutral. Act Accordingly.",
  );
  await page.reload();
  await expect(page.getByLabel("Article title", { exact: true })).toHaveValue(
    "A separate studio headline",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset to kit" }).click();
  await expect(preview.locator("h1")).toHaveText(
    "Black Cherry Is Your New Neutral. Act Accordingly.",
  );
});
test("studio settings, hero ordering and module visibility persist in the preview", async ({
  page,
  context,
}) => {
  await page.goto("/studio");
  await dismissPrivacy(page);
  await page.getByText("Hero copy & order", { exact: true }).click();
  await page
    .getByRole("button", { name: "Move slide 1 down", exact: true })
    .click();
  await page.getByText("Homepage modules", { exact: true }).click();
  await page.getByRole("checkbox", { name: "Just In", exact: true }).uncheck();
  await page.getByText("Publication display settings", { exact: true }).click();
  await page.getByLabel("Masthead tagline").fill("A local preview tagline.");
  await page.getByRole("button", { name: "Save local edits" }).click();
  await expect(page.getByRole("status")).toContainText("Saved in this browser");
  const preview = await context.newPage();
  await preview.goto("/studio/preview");
  await expect(preview.locator(".brand em")).toHaveText(
    "A local preview tagline.",
  );
  await expect(preview.locator(".hero-slide.active h2")).toContainText(
    "Your comfort zone? Adorable.",
  );
  await expect(preview.locator('[data-module="just-in"]')).toHaveCount(0);
});
test("invalid studio body text blocks saving and corrupted storage can be reset", async ({
  page,
}) => {
  await page.goto("/studio");
  await dismissPrivacy(page);
  await page
    .getByLabel("Body sections (JSON: heading and text)")
    .fill("{invalid");
  await expect(
    page.getByRole("button", { name: "Save local edits" }),
  ).toBeDisabled();
  await page.evaluate(() =>
    localStorage.setItem("sugarmenu:studio:v1", '{"version":99}'),
  );
  page.once("dialog", (d) => d.accept());
  await page.reload();
  await expect(
    page.getByRole("main").getByRole("alert").filter({ hasText: /\S/ }),
  ).toContainText("unsupported version");
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Reset to kit" }).click();
  await expect(page.getByRole("status")).toContainText(
    "reset to the supplied kit",
  );
});
for (const width of [390, 768, 1024, 1440])
  test(`responsive layouts and screenshots at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const [name, path] of [
      ["home", "/"],
      ["category", "/eye-candy"],
      ["article", "/eye-candy/black-cherry-is-your-new-neutral"],
      ["community", "/the-sugar-dish"],
      ["newsletter", "/extra-sugar"],
      ["glproud", "/glproud"],
    ]) {
      await page.goto(path);
      if (name === "home") await dismissPrivacy(page);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.locator("img").evaluateAll(async (images) => {
        await Promise.all(
          images.map(async (image) => {
            if (!(image instanceof HTMLImageElement)) return;
            image.loading = "eager";
            try {
              await image.decode();
            } catch {
              /* Surface missing images with the assertion below. */
            }
          }),
        );
      });
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (i) => i instanceof HTMLImageElement && i.naturalWidth > 0,
            ),
          ),
      ).toBe(true);
      if (name === "home")
        await page.screenshot({
          path: testInfo.outputPath(`home-viewport-${width}.png`),
        });
      await page.screenshot({
        path: testInfo.outputPath(`${name}-${width}.png`),
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });

test("studio warns before discarding edits through client navigation", async ({
  page,
}) => {
  await page.goto("/studio");
  await dismissPrivacy(page);
  await page
    .getByLabel("Article title", { exact: true })
    .fill("An unsaved headline");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("link", { name: "SUGARMENU home", exact: true }).click();
  await expect(page).toHaveURL("/studio");
  await expect(page.getByLabel("Article title", { exact: true })).toHaveValue(
    "An unsaved headline",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("link", { name: "SUGARMENU home", exact: true }).click();
  await expect(page).toHaveURL("/");
});
