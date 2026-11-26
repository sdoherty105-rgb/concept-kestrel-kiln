import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", h1: /Country Sourdough/ },
  { path: "/menu", h1: /Price list/ },
];

const CONCEPT_URL = "https://offshiftstudio.com.au/concepts/kestrel-kiln";
const ENQUIRY_URL = "https://offshiftstudio.com.au/?concept=kestrel-kiln#contact";

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

    test("discloses the fictional business and links back to the studio", async ({ page }, testInfo) => {
      await page.goto(path);
      const strip = page.getByTestId("concept-label");
      await expect(strip).toContainText("Fictional concept by OFF/SHIFT Studio");
      const cta =
        testInfo.project.name === "mobile"
          ? strip.getByTestId("concept-cta")
          : strip.getByTestId("concept-cta-wide");
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", ENQUIRY_URL);
      if (testInfo.project.name === "mobile") {
        await expect(strip.getByRole("link", { name: "Back to the concept" })).toHaveCount(0);
      } else {
        const back = strip.getByRole("link", { name: "Back to the concept" });
        await expect(back).toBeVisible();
        await expect(back).toHaveAttribute("href", CONCEPT_URL);
      }
      const footer = page.locator("footer");
      await expect(footer.getByRole("link", { name: "Want a website like this?" })).toHaveAttribute("href", ENQUIRY_URL);
      await expect(footer.getByRole("link", { name: "Back to the concept" })).toHaveAttribute("href", CONCEPT_URL);
    });

    test("the disclosure strip stays in view on load (scroll snap does not skip it)", async ({ browser }) => {
      const ctx = await browser.newContext({ reducedMotion: "no-preference", viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await page.goto(path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
      await expect(page.getByTestId("concept-label")).toBeInViewport();
      await ctx.close();
    });

    test("jump links reach prices, visit and order from the top", async ({ page }) => {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link", { name: "Prices" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Visit" })).toBeVisible();
      await expect(page.getByRole("link", { name: /^(Order|Review pre-order)|Demonstration/ }).first()).toBeVisible();
    });

    test("nothing overflows sideways at 320 px", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 });
      await page.goto(path);
      const wide = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(wide).toBeLessThanOrEqual(320);
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
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/fonts/webfonts.css";
        document.head.appendChild(link);
        document.documentElement.classList.add("fonts-display", "fonts-body");
      });
      await page.waitForSelector("html.fonts-display");
      await page.waitForSelector("html.fonts-body");
      await page.evaluate(() => document.fonts.ready);
      const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family));
      expect(loaded.join(" ")).toMatch(/Bitter/);
    });

    test("loads nothing from other origins (no trackers, no external fonts)", async ({ page, baseURL }) => {
      const external: string[] = [];
      const own = new URL(baseURL!).origin;
      page.on("request", (r) => {
        if (!r.url().startsWith("data:") && new URL(r.url()).origin !== own) external.push(r.url());
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
        await expect(page.getByText("This form is a demonstration and sends nothing.")).toBeVisible();
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
  await expect(page.getByRole("button", { name: /Add to order/ }).first()).toBeVisible();
});


// SHA-256 of public/brand/offshift-wordmark-dark.svg in sdoherty105-rgb/offshift-studio, copied unaltered.
const CANONICAL_WORDMARK_SHA256 = "0cca7e7a612d12dcff0e62dce083ce3ab101cdc75cec32a02bdb075e7594dc1d";

for (const path of ["/", "/menu"]) {
  test(`footer credit on ${path} links to OFF/SHIFT and uses the canonical wordmark`, async ({ page, request }) => {
    await page.goto(path);
    const credit = page.locator("footer [data-footer-credit]");
    await expect(credit).toContainText("Designed by");
    const link = credit.getByRole("link", { name: "OFF/SHIFT Studio" });
    await expect(link).toHaveAttribute("href", "https://offshiftstudio.com.au");
    await expect(link).toHaveAttribute("rel", /noopener/);
    const img = link.locator("img");
    await expect(img).toHaveAttribute("src", "/brand/offshift-wordmark-dark.svg");
    await expect(img).toHaveAttribute("alt", "OFF/SHIFT Studio");
    const width = await img.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBeGreaterThanOrEqual(72);
    expect(width).toBeLessThanOrEqual(96);

    const onDisk = readFileSync(join(process.cwd(), "public/brand/offshift-wordmark-dark.svg"));
    expect(createHash("sha256").update(onDisk).digest("hex")).toBe(CANONICAL_WORDMARK_SHA256);
    const served = await request.get("/brand/offshift-wordmark-dark.svg");
    expect(served.status()).toBe(200);
    expect(createHash("sha256").update(await served.body()).digest("hex")).toBe(CANONICAL_WORDMARK_SHA256);
  });
}
