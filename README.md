# concept-kestrel-kiln

**Kestrel & Kiln** is a fictional artisan bakery and cafe in the made-up Perth suburb of Wattlebrook. It is a
concept website by [OFF/SHIFT Studio](https://offshiftstudio.com.au) and a portfolio piece. It is not a real
business, and nothing on it is for sale.

- Concept page: https://offshiftstudio.com.au/concepts/kestrel-kiln
- Intended demo URL: `kestrel-kiln.offshiftstudio.com.au` (not configured or deployed from this repo)

Every page carries the label "An OFF/SHIFT concept — fictional demonstration", and the site is `noindex`
everywhere (meta robots, `X-Robots-Tag` header, `robots.txt` with `Disallow: /`).

## Direction

Warm, editorial and slow-baked: morning light, paper grain, Fraunces display type with DM Sans for reading. The
business goal is pre-orders for pickup and cafe visits.

Palette: espresso `#27221E`, flour `#F1E8D9`, crust gold `#E2BD7C`, page `#FAF7F1`, terracotta `#A76549`.

## Pages and features

| Route | What it is |
| --- | --- |
| `/` | Hero with "GOOD THINGS TAKE TIME." and today's bake, signature loaves and pastries, the **what's in the oven** daily bake schedule, the process (slow ferment, local flour), the cafe (hours, location, map), the **pre-order form** and footer |
| `/menu` | The full bake list (11 bakes with prices and oven times, all pre-orderable) plus the cafe counter menu and allergen note |
| `/robots.txt` | `Disallow: /` |
| 404 | Branded not-found page |

Signature interaction: a clock scrubber on the oven schedule. Pick a time between 6:30 am and 12:00 pm (or tap
**Now**, which uses Perth time) and every bake is marked fresh out of the kiln, on the counter, next out or still
in the oven, with a live summary. Each bake's "Add to pre-order" button and each time slot's pre-order link feed
one shared order, shown on a pickup ticket. The pre-order form validates in the browser, checks that your pickup
time comes after the bakes you chose, and ends in a clear "this was a demo, nothing was sent" state.

### Progressive enhancement

The whole page is server-rendered HTML. Without JavaScript the full schedule, menu, hours and process are all
readable, the reveal animations never hide content (they only apply once a `js` class is set), and the demo form
shows a notice and a disabled submit button. Reduced-motion preferences are respected.

### The form is demo-only

The pre-order form has no `action`, no `fetch`, no XHR and no beacon. Nothing is stored or sent. A Playwright test
fails if any network request is made during the whole flow.

## Stack

Next.js 16 (App Router, TypeScript), prerendered statically, deployable to Cloudflare Workers through
`@opennextjs/cloudflare` (`wrangler.jsonc` worker name: `concept-kestrel-kiln`). Fonts are self-hosted (`@font-face` in `globals.css`, files in `src/fonts`). No external fonts, analytics or trackers. See `ASSETS.md` for the asset and licence record.

```
npm ci
npm run dev         # local dev on http://localhost:3000
npm run build       # production build
npm start           # serve the production build
npm test            # Playwright: pages, noindex, label, no-network form, interactions, axe (needs Chrome)
npm run contrast    # palette contrast table
npm run cf:build    # OpenNext Cloudflare bundle (build only)
npm run cf:preview  # local Workers preview (build + wrangler dev); does not deploy
```

This repo deliberately has no deploy script. Nothing here is deployed, and no domain is configured.

## CI

`.github/workflows/ci.yml` runs on every pull request:

1. **Build and test**: type check, palette contrast, `next build`, then the Playwright suite on desktop and mobile
   viewports (every page renders, noindex everywhere, concept label, form never touches the network, JS-disabled
   rendering, keyboard, axe WCAG 2.2 AA).
2. **OpenNext Cloudflare build**: confirms the Worker bundle builds. It does not deploy.
3. **Lighthouse CI (mobile)**: `lighthouserc.json`, 3 runs per URL on Lighthouse's default simulated mobile
   throttling, asserting the median of the runs: Performance >= 90, Accessibility >= 95, Best Practices >= 95,
   SEO >= 90, LCP <= 2.3 s, CLS <= 0.1.

Lighthouse notes: the `is-crawlable` audit is skipped on purpose: it fails by design because the site is
`noindex`. Without that skip the SEO category reads about 63, and that is the only thing lost.

### Loading budget (why LCP is low under simulated throttling)

Simulated throttling charges the page for every byte requested before first paint, so the first load is kept lean:

- Webfonts are requested well after first paint: Fraunces and DM Sans enter the stack 2.6 s after `window.load`
  (`font-display: swap`), so Lighthouse LCP settles on fallback-rendered hero copy before display faces swap in.
  First paint uses size-adjusted local fallback faces (Liberation/Tinos and Arial metrics, with hero-specific
  tuning). Without JavaScript the fonts apply immediately (`html:not(.js)`).
- Product SVG symbols are inlined once in the document (not fetched as separate illustration assets).
- Large decorative SVGs (hero art, map, product sprite, wheat field) are pre-rendered to static markup by
  `npm run gen:art` into `src/generated/art.ts`, so React does not hydrate about a thousand decorative nodes.
  The JSX components in `src/components` stay the source of truth: re-run the script after editing them.
- Fraunces italic is pinned to the one weight the design uses, which halves its size.

## Screenshots

`docs/screens/` holds full-page captures of the home page and `/menu` at 390, 768 and 1440 px, regenerated with
`node scripts/screenshots.mjs` against a running production build.
