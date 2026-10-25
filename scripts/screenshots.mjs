import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const out = process.env.OUT ?? "docs/screens";
const sizes = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];
const pages = [
  { name: "home", path: "/" },
  { name: "menu", path: "/menu" },
];

const browser = await chromium.launch({ channel: "chrome" });
for (const s of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: s.width, height: s.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    timezoneId: "Australia/Perth",
    isMobile: s.width < 600,
  });
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date("2026-10-28T23:45:00Z") });
  for (const p of pages) {
    await page.goto(base + p.path, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/fonts/webfonts.css";
      document.head.appendChild(link);
      document.documentElement.classList.add("fonts-display", "fonts-body");
    });
    await page.waitForSelector("html.fonts-body");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/${p.name}-${s.name}.png`, fullPage: true });
    console.log("saved", `${p.name}-${s.name}`);
  }
  await ctx.close();
}
await browser.close();
