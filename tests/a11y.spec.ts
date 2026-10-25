import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of ["/", "/menu", "/nope"]) {
  test(`axe: no WCAG 2.x A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in")));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target.join(" ")).slice(0, 4) })),
    ).toEqual([]);
  });
}

test("axe: oven schedule at every time and error summary state", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in")));
  const group = page.getByRole("radiogroup", { name: "Set the clock" });
  for (const t of ["6:30 am", "8:00 am", "12:00 pm"]) {
    await group.getByRole("radio", { name: t }).click();
    const r = await new AxeBuilder({ page }).include("#oven").withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
  }
  await page.getByRole("button", { name: "Place demo pre-order" }).click();
  const r = await new AxeBuilder({ page }).include("#pre-order").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
});

test("keyboard: skip link and visible focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});
