# concept-kestrel-kiln

**Kestrel & Kiln** is a fictional artisan bakery and cafe in the made-up Perth suburb of Wattlebrook. It is a
concept website by [OFF/SHIFT Studio](https://offshiftstudio.com.au) and a portfolio piece. It is not a real
business, and nothing on it is for sale.

- Concept page: https://offshiftstudio.com.au/concepts/kestrel-kiln
- Demo URL: https://kestrel-kiln.offshiftstudio.com.au (see Deployment for which version it serves)

Every page opens with a studio strip: "Fictional business — a concept site by OFF/SHIFT Studio", a "Back to the
concept" link and "Want a website like this?" (to `https://offshiftstudio.com.au/?concept=kestrel-kiln#contact`).
The footer repeats both links. The site is `noindex` everywhere (meta robots, `X-Robots-Tag` header,
`robots.txt` with `Disallow: /`).

## Direction

Sleek, one bake at a time. The home page is a plate sequence: six full-viewport still lifes, each with a lab-label
spec (flour, hydration, ferment, out of the oven) and an inline stepper. A 24-hour bake clock follows, then the
order ledger, then the visit as four lines of type. There is no hamburger and no card grid: a hairline header
carries four jump links (bake times, prices, visit, order; prices and visit on mobile, where the bottom dock
carries the order), and plate 01 opens with a one-line index to the hours and the order.

Palette: flour `#F5F2EB`, crust ink `#1A1815`, ash `#6B655B`, kiln ember `#B3431F`. One typeface, Hanken Grotesk,
self-hosted and subset. Prices, times and the order are labelled as demonstration data.

## Pages and features

| Route | What it is |
| --- | --- |
| `/` | Six plates, the bake clock (Perth time), the order ledger and the visit |
| `/menu` | A plain printable price list for every bake, plus the cafe counter |
| `/robots.txt` | `Disallow: /` |
| 404 | Branded not-found page |

`/bakes/[slug]` was not a route on main, and no page links to it. Routes are `/`, `/menu`, `/robots.txt` and the 404.

The order is one shared ledger. Steppers on each plate and on the ledger update a hairline receipt. The form
validates in the browser, checks that the pickup is after the bakes you chose and not before opening (Sunday
opens at 7:00 am), and ends in a clear "this was a demo, nothing was sent" state. It has no `action`, no
`fetch`, no XHR and no beacon; a Playwright test fails if any request leaves the page while ordering.

Ordering rule (one rule, used everywhere): orders close 6 pm the evening before, pickups run 6:30 am to
12:00 pm in step with the bake schedule, and a bag is held for an hour after the pickup time chosen. The ticket
and the success state show the held-until time.

Without JavaScript the plates, schedule, price list and hours are readable. The demo submit stays disabled.
Reduced motion removes the cross-fade, the image reveal and scroll snapping.

## Stack

Next.js 16 (App Router, TypeScript), prerendered statically, deployable to Cloudflare Workers through
`@opennextjs/cloudflare` (`wrangler.jsonc` worker name: `concept-kestrel-kiln`). The font is self-hosted. No
external fonts, analytics or trackers. See `docs/ASSETS.md`.

```
npm ci
npm run dev         # local dev on http://localhost:3000
npm run build       # production build
npm start           # serve the production build
npm test            # Playwright (needs Chrome)
npm run contrast    # palette contrast table
npm run cf:build    # OpenNext Cloudflare bundle (build only, does not deploy)
npm run cf:preview  # local Workers preview; does not deploy
```

This repo deliberately has no deploy script, and CI never deploys (the `cloudflare-build` job only builds).

## Deployment

The demo URL is served by the Cloudflare Worker `concept-kestrel-kiln`. Deploys are configured in the
Cloudflare dashboard, not in this repo. As checked on 2026-11-10, https://kestrel-kiln.offshiftstudio.com.au
serves `main` at `0df840d` (the earlier typographic shopfront), not the plate sequence on
`redesign/2026-11` (PR #3). Pushing to the PR branch has not changed the live site: commits pushed there on
2026-11-02 never appeared on it. The live site follows `main`; whether merging deploys automatically depends on the Cloudflare dashboard
settings, which are not in this repo, so treat a merge to `main` as a production release.

## CI

`.github/workflows/ci.yml` runs on every pull request: type check, contrast, production build, Playwright
(desktop and mobile), the OpenNext bundle (no deploy), and mobile Lighthouse (median of three). Lighthouse
asserts Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 90, LCP <= 2.5 s and CLS <= 0.1.
The `is-crawlable` audit is skipped because the site is `noindex` on purpose. Home LCP is a warning at the
same 2.5 s ceiling rather than a hard failure, which is the budget already on `main`.

## Screenshots

`docs/screens/` holds full-page captures from the PR's first pass (they predate the studio strip and jump links). `before-*` is the previous shopfront. `after-*` is this plate
sequence. Both are at 390 and 1440 for the home page, the price list and the 404.
