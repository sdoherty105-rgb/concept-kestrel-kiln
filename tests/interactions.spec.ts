import { expect, test } from "@playwright/test";

test.describe("bake schedule", () => {
  test("moving the clock changes what is on the counter", async ({ page }) => {
    await page.goto("/");
    const group = page.getByRole("radiogroup", { name: "Set the clock" });
    await expect(group).toBeVisible();

    await group.getByRole("radio", { name: "6:30 am" }).click();
    await expect(page.getByTestId("slot-0630")).toHaveAttribute("data-state", "fresh");
    await expect(page.getByTestId("slot-0700")).toHaveAttribute("data-state", "next");
    await expect(page.getByTestId("slot-1200")).toHaveAttribute("data-state", "later");
    await expect(page.getByTestId("readout")).toContainText("2 bakes on the counter");

    await group.getByRole("radio", { name: "12:00 pm" }).click();
    await expect(page.getByTestId("slot-0630")).toHaveAttribute("data-state", "out");
    await expect(page.getByTestId("slot-1200")).toHaveAttribute("data-state", "fresh");
    await expect(page.getByTestId("readout")).toContainText("11 bakes on the counter");
  });

  test("arrow keys move through the times", async ({ page }) => {
    await page.goto("/");
    const group = page.getByRole("radiogroup", { name: "Set the clock" });
    const current = group.getByRole("radio", { checked: true });
    await expect(current).toHaveText("7:30 am");
    await current.focus();
    await page.keyboard.press("ArrowRight");
    await expect(group.getByRole("radio", { checked: true })).toHaveText("8:00 am");
  });

  test("a slot's pre-order link pre-selects that pickup time", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("slot-0900").getByRole("link", { name: /Pre-order for a 9:00 am pickup/ }).click();
    await expect(page.getByRole("radio", { name: "9:00 am", exact: true }).and(page.locator('input[name="pickup-slot"]'))).toBeChecked();
    await expect(page.getByTestId("ticket")).toContainText("9:00 am");
  });
});

test.describe("pre-order flow (demo)", () => {
  test("adding items updates the ticket and the floating order bar", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("product-card").first();
    await card.getByRole("button", { name: /Add to order/ }).click();
    await card.getByRole("button", { name: "Add one more Country Sourdough" }).click();
    await expect(page.getByTestId("ticket-total")).toHaveText("$19.00");
    await expect(page.getByTestId("order-bar")).toContainText("2 items");
  });

  test("validates, then completes with a clear demo success state", async ({ page }) => {
    await page.goto("/");
    await page.locator("#pre-order").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Place demo pre-order" }).click();
    const summary = page.getByRole("alert").filter({ hasText: "problems with your order" });
    await expect(summary).toBeVisible();
    await expect(summary).toContainText("Add at least one item");
    await expect(summary).toContainText("Choose a pickup day");

    await page.getByRole("button", { name: "Add one Butter Croissant" }).click();
    await page.getByLabel(/^Day/).selectOption("Saturday");
    await page.locator('input[name="pickup-slot"][value="0630"]').check({ force: true });
    await page.getByLabel(/Name for the bag/).fill("Sam");
    await page.getByLabel(/^Mobile/).fill("12345");
    await page.getByRole("button", { name: "Place demo pre-order" }).click();
    await expect(page.getByText(/comes out of the oven at 7:00 am/).first()).toBeVisible();
    await expect(page.getByText(/Enter an Australian mobile number/).first()).toBeVisible();

    await page.locator('input[name="pickup-slot"][value="0800"]').check({ force: true });
    await page.getByLabel(/^Mobile/).fill("0400 000 000");
    await page.getByRole("button", { name: "Place demo pre-order" }).click();

    const success = page.getByTestId("order-success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("This was a demo, so nothing was sent");
    await expect(success).toContainText("Saturday, 8:00 am (held until 9:00 am)");
    await expect(success.getByText("Demo only")).toBeVisible();
  });

  test("the form never makes a network request", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __net: string[] };
      w.__net = [];
      const log = (kind: string) => w.__net.push(kind);
      const f = window.fetch;
      window.fetch = (...a) => {
        log("fetch");
        return f(...a);
      };
      const open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function (...a: unknown[]) {
        log("xhr");
        return (open as (...x: unknown[]) => void).apply(this, a);
      };
      navigator.sendBeacon = () => {
        log("beacon");
        return false;
      };
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const form = page.getByTestId("order-form");
    await expect(form).not.toHaveAttribute("action", /.+/);
    await expect(form).not.toHaveAttribute("method", /post/i);

    const requests: string[] = [];
    page.on("request", (r) => requests.push(`${r.method()} ${r.url()}`));
    const baseline = await page.evaluate(() => (window as unknown as { __net: string[] }).__net.length);

    await page.getByRole("button", { name: "Add one Rye & Caraway" }).click();
    await page.getByLabel(/^Day/).selectOption("Friday");
    await page.locator('input[name="pickup-slot"][value="1030"]').check({ force: true });
    await page.getByLabel(/Name for the bag/).fill("Alex");
    await page.getByLabel(/^Mobile/).fill("0411 222 333");
    await page.getByLabel(/^Email/).fill("alex@example.com");
    await page.getByRole("button", { name: "Place demo pre-order" }).click();
    await expect(page.getByTestId("order-success")).toBeVisible();
    await page.waitForTimeout(500);

    expect(requests).toEqual([]);
    const after = await page.evaluate(() => (window as unknown as { __net: string[] }).__net);
    expect(after.length).toBe(baseline);
    expect(page.url()).not.toContain("?");
  });
});

test("one hold rule everywhere, and the latest pickup is still held before closing", async ({ page }) => {
  await page.goto("/");
  const rule = "Your bag is held for an hour after the pickup time you choose.";
  await expect(page.locator("#oven")).toContainText(rule);
  await expect(page.locator("#pre-order .section-head")).toContainText(rule);
  await expect(page.locator("body")).not.toContainText(/held until 10/);
  await page.locator('input[name="pickup-slot"][value="1200"]').check({ force: true });
  await expect(page.getByTestId("ticket-held")).toHaveText("1:00 pm");
});

test("a Sunday pickup cannot be before the 7:00 am opening", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add one Country Sourdough" }).click();
  await page.getByLabel(/^Day/).selectOption("Sunday");
  await page.locator('input[name="pickup-slot"][value="0630"]').check({ force: true });
  await page.getByLabel(/Name for the bag/).fill("Sam");
  await page.getByLabel(/^Mobile/).fill("0400 000 000");
  await page.getByRole("button", { name: "Place demo pre-order" }).click();
  await expect(page.getByText(/On Sunday the bakery opens at 7:00 am/).first()).toBeVisible();
  await expect(page.getByTestId("order-success")).toHaveCount(0);
});

test("cafe hours and open status render", async ({ page }) => {
  await page.goto("/");
  const hours = page.getByRole("table", { name: /opening hours/ });
  await expect(hours).toContainText("6:30 am – 3:00 pm");
  await expect(hours).toContainText("Closed");
});

test("menu page lets visitors add bakes to the pre-order", async ({ page }) => {
  await page.goto("/menu");
  await expect(page.getByTestId("menu-item")).toHaveCount(11);
  await page.getByRole("button", { name: /Add Focaccia|Add Rosemary & Sea Salt Focaccia/ }).click();
  await expect(page.getByTestId("order-bar")).toContainText("1 item");
  await page.getByRole("link", { name: "Review pre-order" }).click();
  await expect(page).toHaveURL(/#pre-order$/);
  await expect(page.getByTestId("ticket-total")).toHaveText("$13.00");
});
