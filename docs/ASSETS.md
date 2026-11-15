# Assets and licensing

Canonical record for the Sleek plate redesign. Every file below was made for this concept or is an open-licensed font. There are no stock photographs, real faces, third-party logos, analytics or trackers.

The still lifes are generated images, not photographs of a real bakery. Prices, bake times, hours and the order are demonstration data and are labelled as such on the pages.

## Locked prompt sheet

Every bake was generated from the same sheet, then graded so the paper ground sits on flour `#F5F2EB`:

> Photorealistic studio still life of one single bake, occupying about 70 percent of the frame. Seamless matte paper background in warm off-white flour tone. One soft key light from camera left at 45 degrees, shadow falling gently to the right. No plate, linen, board, crumbs, utensils, hands, faces, text, logo or watermark. Neutral grade.

Each later still used the country sourdough frame as the reference so the light and ground stay in one family. Generation date: 2 November 2026, via the Cursor image tool. Crops are 4:5. Paper pixels connected to the frame edge were relit onto `#F5F2EB` with a small Node script using `sharp`, so the page ground and the photograph share one colour. Shadows stay soft. The graded masters are not committed; the delivery files are the AVIF derivatives.

The kouign-amann was regenerated the same day. The first frame read as a round spiral. The replacement is one square pastry with caramelised sides and a laminated edge, shot to the same prompt and reference.

| File | Subject | Bytes, 800 / 1200 | Licence |
| --- | --- | --- | --- |
| `public/bakes/country-sourdough-*.avif` | Round country sourdough boule. Paper regraded to flour `#F5F2EB`. The 800-wide file is the mobile LCP image and is encoded smaller than the other plates. | 19,057 / 35,855 | Original generated work for this concept |
| `public/bakes/butter-croissant-*.avif` | Single butter croissant | 24,608 / 41,954 | Original generated work for this concept |
| `public/bakes/rye-caraway-*.avif` | Dark rye loaf | 32,993 / 53,771 | Original generated work for this concept |
| `public/bakes/kouign-amann-*.avif` | Square caramelised kouign-amann | 33,503 / 55,595 | Original generated work for this concept |
| `public/bakes/spelt-batard-*.avif` | Seeded spelt batard | 32,856 / 54,023 | Original generated work for this concept |
| `public/bakes/focaccia-*.avif` | Rosemary and sea salt focaccia | 31,318 / 52,867 | Original generated work for this concept |

The first plate preloads the country sourdough pair (`800` and `1200` wide). Other plates load lazily. No WebP or JPEG is shipped.

## Font

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Hanken Grotesk, weight axis 200–500, Latin subset | `src/fonts/HankenGrotesk.woff2` (copied to `public/fonts/` at build) | The Hanken Grotesk Project Authors, https://github.com/marcologous/hanken-grotesk. Latin variable file from Fontsource (`hanken-grotesk:vf@5.2.8`), then subset with `scripts/subset-fonts.py`. | SIL Open Font License 1.1 (`src/fonts/OFL-HankenGrotesk.txt`) |

One family only. `@font-face` lives in `src/app/globals.css`. The site does not request Google Fonts or any other third-party origin.

## Other

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Favicon | `src/app/icon.svg` | Drawn for this concept: a flour square and a single ember needle. No radius. | Original work |

Fraunces, DM Sans, the soft SVG loaves and the generated sprite were removed in this redesign.

## Content

All business details are invented: the name Kestrel & Kiln, the suburb of Wattlebrook, Millstone Lane, the phone number (a fictional 5550-series number), the `.example` email address, hours, menu, prices, hydration and ferment figures. There are no reviews, testimonials, awards, ratings, statistics or client logos.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Flour | `#F5F2EB` | Page ground |
| Crust ink | `#1A1815` | Text and hairlines |
| Ash | `#6B655B` | Secondary text |
| Kiln ember | `#B3431F` | The only accent: live dot, focus, order action |

Run `npm run contrast -- --strict` for the pairs. Ink, ash and ember each clear 4.5:1 on flour.
