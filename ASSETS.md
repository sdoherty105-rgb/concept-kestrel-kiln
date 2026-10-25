# Assets and licensing

Everything on this site is either original work made for this concept or an open-licensed font. There are
no photographs, stock images, faces, third-party logos, analytics or trackers.

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Product illustrations (loaves, croissants, buns, kouign-amann, danish, scroll, focaccia) | `src/components/ProductArt.tsx` | Drawn as inline SVG for this project by OFF/SHIFT Studio | Original work, created for this concept |
| Hero scene (kiln arch, sunrise, wheat field, counter) | `src/components/Illustrations.tsx` (`HeroArt`) | Drawn as inline SVG for this project | Original work |
| Kestrel mark, wheat sprig, oven icon | `src/components/Illustrations.tsx` | Drawn as inline SVG for this project | Original work |
| Illustrative suburb map | `src/components/Illustrations.tsx` (`MapArt`) | Drawn as inline SVG; fictional streets, not a real map | Original work |
| Favicon | `src/app/icon.svg` | Drawn for this project (kestrel on espresso) | Original work |
| Paper grain texture | `src/app/globals.css` (inline SVG `feTurbulence` data URI) | Generated procedurally in CSS/SVG | Original work |
| Fraunces (display) | `src/fonts/Fraunces-opsz.woff2`, `src/fonts/Fraunces-italic.woff2` | The Fraunces Project Authors, https://github.com/undercasetype/Fraunces, via the `@fontsource-variable/fraunces` npm package. Weight and optical-size axes limited and glyphs subset to Latin with `scripts/subset-fonts.py`. | SIL Open Font License 1.1 (`src/fonts/OFL-Fraunces.txt`) |
| DM Sans (body) | `src/fonts/DMSans.woff2` | Colophon Foundry and Indian Type Foundry, https://github.com/googlefonts/dm-fonts, via the `@fontsource-variable/dm-sans` npm package. Weight axis limited and glyphs subset to Latin with `scripts/subset-fonts.py`. | SIL Open Font License 1.1 (`src/fonts/OFL-DMSans.txt`) |

Fonts are self-hosted through `next/font/local`. The site makes no request to Google Fonts or any other
third-party origin.

## Content

All business details are invented: the name Kestrel & Kiln, the suburb of Wattlebrook, Millstone Lane, the
phone number (a fictional 5550-series number), the `.example` email address, hours, menu and prices.
There are no reviews, testimonials, awards, ratings, statistics or client logos anywhere on the site.

## Palette

| Token | Hex |
| --- | --- |
| Espresso | `#27221E` |
| Flour | `#F1E8D9` |
| Crust gold | `#E2BD7C` |
| Page | `#FAF7F1` |
| Terracotta | `#A76549` |
| Terracotta deep (derived, for text and buttons) | `#8A4A32` |

Plain terracotta `#A76549` is 4.27:1 on the page colour, which is below the 4.5:1 AA threshold for small text,
so it is only used for decoration and large graphics. Text and buttons use the deeper `#8A4A32` (6.32:1 on page,
5.56:1 on flour). Run `npm run contrast` to see every pair checked.
