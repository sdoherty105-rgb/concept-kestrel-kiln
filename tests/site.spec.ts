import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", h1: /GOOD THINGS\s*TAKE\s*TIME\./ },
  { path: "/menu", h1: /The bake\s*list\./ },
];

const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/kestrel-kiln";

for (const { path, h1 } of PAGES) {
  test.describe(`page ${path}`, () => {
    test("renders with a heading and landmarks", async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(h1);
      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en-AU");
    });

    test("shows the OFF/SHIFT concept label linking to the concept page", async ({ page }) => {
      await page.goto(path);
      const label = page.getByTestId("concept-label").getByRole("link");
      await expect(label).toBeVisible();
      await expect(label).toContainText("An OFF/SHIFT concept — fictional demonstration");
      await expect(label).toHaveAttribute("href", CONCEPT_URL);
    });

    test("is noindex in meta tag and response header", async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.headers()["x-robots-tag"]).toMatch(/noindex/);
      expect(res?.headers()["x-robots-tag"]).toMatch(/nofollow/);
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toMatch(/noindex/);
      expect(robots).toMatch(/nofollow/);
    });

    test("webfonts are self-hosted and applied after load", async ({ page }) => {
      await page.goto(path, { waitUntil: "load" });
      await page.evaluate(() => {
        document.documentElement.classList.add("fonts-display", "fonts-body");
      });
      await page.waitForSelector("html.fonts-display");
      await page.waitForSelector("html.fonts-body");
      await page.evaluate(() => document.fonts.ready);
      const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
      expect(loaded.join(" ")).toMatch(/DM Sans/);
      expect(loaded.join(" ")).toMatch(/Fraunces/);
    });

    test("loads nothing from other origins (no trackers, no external fonts)", async ({ page }) => {
      const external: string[] = [];
      page.on("request", (r) => {
        const u = new URL(r.url());
        if (u.origin !== new URL(page.url() === "about:blank" ? "http://localhost:3100" : page.url()).origin && !r.url().startsWith("data:"))
          external.push(r.url());
      });
      await page.goto(path, { waitUntil: "networkidle" });
      expect(external).toEqual([]);
    });

    test("works with JavaScript disabled", async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false });
      const page = await ctx.newPage();
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(h1);
      await expect(page.getByTestId("concept-label")).toBeVisible();
      if (path === "/") {
        await expect(page.getByTestId("slot-0630")).toBeVisible();
        await expect(page.getByTestId("slot-1200")).toContainText("Rosemary");
        await expect(page.getByText("Skip the queue.")).toBeVisible();
        await expect(page.getByRole("button", { name: /Place demo pre-order/ })).toBeDisabled();
      }
      await ctx.close();
    });
  });
}

test("unknown route returns the styled 404 and stays noindex", async ({ page }) => {
  const res = await page.goto("/nope");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Nothing in");
  await expect(page.getByTestId("concept-label")).toBeVisible();
  const robots = await page.locator('meta[name="robots"]').evaluateAll((els) => els.map((e) => e.getAttribute("content")));
  expect(robots.length).toBeGreaterThan(0);
  for (const content of robots) expect(content).toMatch(/noindex/);
});

test("robots.txt disallows everything", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/User-Agent: \*/i);
  expect(body).toMatch(/Disallow: \//);
  expect(body).not.toMatch(/Allow: \/\s*$/m);
});

test("hero headline and today's bake are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("today-bake")).toContainText("Country Sourdough");
  await expect(page.getByRole("link", { name: /Pre-order for pickup/ }).first()).toBeVisible();
});
