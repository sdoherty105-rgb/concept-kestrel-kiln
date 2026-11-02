# concept-kestrel-kiln

**Kestrel & Kiln** is a fictional artisan bakery and cafe in the made-up Perth suburb of Wattlebrook. It is a
concept website by [OFF/SHIFT Studio](https://offshiftstudio.com.au) and a portfolio piece. It is not a real
business, and nothing on it is for sale.

- Concept page: https://offshiftstudio.com.au/concepts/kestrel-kiln
- Intended demo URL: `kestrel-kiln.offshiftstudio.com.au` (not configured or deployed from this repo)

Every page carries the label "An OFF/SHIFT concept — fictional demonstration", and the site is `noindex`
everywhere (meta robots, `X-Robots-Tag` header, `robots.txt` with `Disallow: /`).

## Direction

Sleek, one bake at a time. The home page is a plate sequence: six full-viewport still lifes, each with a lab-label
spec (flour, hydration, ferment, out of the oven) and an inline stepper. A 24-hour bake clock follows, then the
order ledger, then the visit as four lines of type. There is no navigation bar, no hamburger and no card grid.

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
validates in the browser, checks that the pickup is after the bakes you chose, and ends in a clear "this was a
demo, nothing was sent" state. It has no `action`, no `fetch`, no XHR and no beacon.

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

This repo deliberately has no deploy script. Nothing here is deployed, and no domain is configured.

## CI

`.github/workflows/ci.yml` runs on every pull request: type check, contrast, production build, Playwright
(desktop and mobile), the OpenNext bundle (no deploy), and mobile Lighthouse (median of three). Lighthouse
asserts Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 90, LCP <= 2.5 s and CLS <= 0.1.
The `is-crawlable` audit is skipped because the site is `noindex` on purpose. Home LCP is a warning at the
same 2.5 s ceiling rather than a hard failure, which is the budget already on `main`.

## Screenshots

`docs/screens/` holds full-page captures. `before-*` is the previous shopfront. `after-*` is this plate
sequence. Both are at 390 and 1440 for the home page, the price list and the 404.
