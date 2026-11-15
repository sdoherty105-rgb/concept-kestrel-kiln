import { expect, test } from "@playwright/test";

// Regression checks for the issue #84 quality-gate findings (K1 to K4).

test("bake clock: product names sit in the wide column, not the 9rem time column (K1)", async ({ page }) => {
  await page.goto("/");
  const wide = (page.viewportSize()?.width ?? 0) >= 900;
  const rows = await page.$$eval(".slot:not(.slot-rules)", (slots) =>
    slots.map((slot) => {
      const time = slot.querySelector(".slot-time")!.getBoundingClientRect();
      const items = slot.querySelector(".slot-items")!.getBoundingClientRect();
      const names = [...slot.querySelectorAll(".slot-items .nm")].map((n) => {
        const lh = parseFloat(getComputedStyle(n).lineHeight);
        return n.getBoundingClientRect().height / lh;
      });
      return {
        timeRight: time.right,
        itemsLeft: items.left,
        itemsWidth: items.width,
        rowWidth: slot.getBoundingClientRect().width,
        maxLines: Math.max(...names),
      };
    }),
  );
  expect(rows.length).toBeGreaterThan(0);
  for (const r of rows) {
    // Every product name fits on one line.
    expect(r.maxLines).toBeLessThan(1.5);
    if (wide) {
      expect(r.itemsLeft).toBeGreaterThan(r.timeRight);
      expect(r.itemsWidth).toBeGreaterThan(300);
    } else {
      // Below 900px the list spans the full row, as before the fix.
      expect(r.itemsWidth).toBeGreaterThanOrEqual(r.rowWidth - 1);
    }
  }
});

test("plate photos meet the flour ground at every edge, all six plates (K2, K3)", async ({ page }) => {
  await page.goto("/");
  const imgs = page.locator(".plate-photo img");
  const n = await imgs.count();
  expect(n).toBe(6);
  for (let i = 0; i < n; i++) {
    const img = imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const worst = await img.evaluate((el: HTMLImageElement) => {
      const c = document.createElement("canvas");
      c.width = el.naturalWidth;
      c.height = el.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(el, 0, 0);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      const flour = [245, 242, 235];
      let max = 0;
      const at = (x: number, y: number) => {
        const k = (y * c.width + x) * 4;
        for (let ch = 0; ch < 3; ch++) max = Math.max(max, Math.abs(data[k + ch] - flour[ch]));
      };
      for (let x = 0; x < c.width; x++) {
        at(x, 0);
        at(x, c.height - 1);
      }
      for (let y = 0; y < c.height; y++) {
        at(0, y);
        at(c.width - 1, y);
      }
      return { src: el.currentSrc.split("/").pop(), max };
    });
    // Every plate meets flour at the frame edge: below 900px the whole frame shows (contain).
    expect(worst.max, `${worst.src} edge vs flour`).toBeLessThanOrEqual(4);
  }
});

test("phone and tablet plates show the whole bake, letterboxed on flour (K3)", async ({ page }) => {
  await page.goto("/");
  const narrow = (page.viewportSize()?.width ?? 0) < 900;
  const styles = await page.$$eval(".plate-photo img", (els) =>
    els.map((el) => {
      const cs = getComputedStyle(el);
      return { fit: cs.objectFit, bg: cs.backgroundColor };
    }),
  );
  for (const s of styles) {
    if (narrow) {
      expect(s.fit).toBe("contain");
      expect(s.bg).toBe("rgb(245, 242, 235)");
    }
  }
});

test("keyboard: footer links stay in view with scroll snap on (K4)", async ({ browser }, info) => {
  test.skip(info.project.name !== "desktop", "1440 desktop check; one run is enough");
  const ctx = await browser.newContext({ reducedMotion: "no-preference", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/");
  const seen: string[] = [];
  for (let i = 0; i < 250 && seen.length < 5; i++) {
    await page.keyboard.press("Tab");
    const inFooter = await page.evaluate(() => !!document.activeElement?.closest(".site-footer"));
    if (!inFooter) {
      if (seen.length) break;
      continue;
    }
    // Let proximity snapping settle before checking.
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const b = el.getBoundingClientRect();
      return { name: el.textContent?.trim() ?? "", top: b.top, bottom: b.bottom, vh: window.innerHeight };
    });
    expect(r.top, `${r.name} top`).toBeGreaterThanOrEqual(0);
    expect(r.bottom, `${r.name} bottom`).toBeLessThanOrEqual(r.vh);
    seen.push(r.name);
  }
  expect(seen).toEqual(
    expect.arrayContaining(["Want a website like this?", "Back to the concept", "OFF/SHIFT Studio", "Price list"]),
  );
  await ctx.close();
});
