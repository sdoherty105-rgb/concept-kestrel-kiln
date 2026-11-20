# Assets and licensing

Canonical record for the Sleek plate redesign. Every file below was made for this concept or is an open-licensed font. There are no stock photographs, real faces, third-party logos, analytics or trackers.

The still lifes are generated images, not photographs of a real bakery. Prices, bake times, hours and the order are demonstration data and are labelled as such on the pages.

## Locked prompt sheet

Every bake was generated from the same sheet, then graded so the paper ground sits on flour `#F5F2EB`:

> Photorealistic studio still life of one single bake, occupying about 70 percent of the frame. Seamless matte paper background in warm off-white flour tone. One soft key light from camera left at 45 degrees, shadow falling gently to the right. No plate, linen, board, crumbs, utensils, hands, faces, text, logo or watermark. Neutral grade.

Each later still used the country sourdough frame as the reference so the light and ground stay in one family. Generation date: 2 November 2026, via an AI image tool. Crops are 4:5. Paper pixels connected to the frame edge were relit onto `#F5F2EB` with a small Node script using `sharp`, so the page ground and the photograph share one colour. Shadows stay soft. The graded masters are not committed; the delivery files are the AVIF derivatives.

The kouign-amann was regenerated the same day. The first frame read as a round spiral. The replacement is one square pastry with caramelised sides and a laminated edge, shot to the same prompt and reference.

| File | Subject | Bytes, 800 / 1200 | Licence |
| --- | --- | --- | --- |
| `public/bakes/country-sourdough-*.avif` | Round country sourdough boule. Paper regraded to flour `#F5F2EB`; shadow rebuilt 16 Nov 2026 (see below). The 800-wide file is the mobile LCP image and is encoded smaller than the other plates. | 17,636 / 35,758 | Original generated work for this concept |
| `public/bakes/butter-croissant-*.avif` | Single butter croissant. Shadow rebuilt 16 Nov 2026 (see below). | 23,143 / 41,853 | Original generated work for this concept |
| `public/bakes/rye-caraway-*.avif` | Dark rye loaf. Shadow rebuilt 15 Nov 2026 (see below). | 32,735 / 52,666 | Original generated work for this concept |
| `public/bakes/kouign-amann-*.avif` | Square caramelised kouign-amann. Shadow rebuilt 15 Nov 2026 (see below). | 33,543 / 54,420 | Original generated work for this concept |
| `public/bakes/spelt-batard-*.avif` | Seeded spelt batard. Shadow rebuilt 15 Nov 2026 (see below). | 31,256 / 52,752 | Original generated work for this concept |
| `public/bakes/focaccia-*.avif` | Rosemary and sea salt focaccia. Shadow rebuilt 16 Nov 2026 (see below). | 29,813 / 52,337 | Original generated work for this concept |

**Shadow regrade, 15 Nov 2026 (issue #84, finding K2).** On the rye, kouign-amann and spelt plates, the first grade left a stair-stepped patch of un-relit warm shadow under each bake, and the cast shadow ran off the right edge of the frame. At 1440 that showed as a hard rectangle against the page. The original generated masters were not available, so these three were regraded from their committed 1200-wide AVIFs. The bake pixels are kept as they were. The paper is rebuilt as flour `#F5F2EB` multiplied by the photographed shading, smoothed so the old contour disappears, warmed slightly as it deepens to match the photographed shadow, and tapered with distance from the bake. It fades to flour before every edge the page can show: the frame edges and the 1440 crops (rye y 114 to 1329, kouign y 126 to 1326, measured on the 1200 master). Every edge pixel is now within 1 of flour (it was up to 115). Both sizes were encoded from the regraded master with `sharp` AVIF, 4:4:4 chroma, effort 9 and quality 54, which keeps each file within a few percent of its previous size.

**Shadow regrade, 16 Nov 2026 (issue #84, follow-up to K3).** Below 900px the plates use `object-fit: contain`, so the whole frame shows inside the flour box. The butter croissant, country sourdough and focaccia still had cast shadow touching their right frame edge (ΔRGB up to 77, 113 and 117), which showed as a hard vertical seam on phones and tablets. These three were regraded with the same method and settings as the 15 Nov regrade above, from their committed 1200-wide AVIFs. Every edge pixel of all six plates is now within 1 of flour. Each size was encoded with AVIF 4:4:4, effort 9, at the highest quality that keeps it at or under its previous byte size: croissant q53/q55, country sourdough q36/q39 and focaccia q53/q54 (800/1200). The country sourdough 800w, the mobile LCP image, stays the smallest file.

The first plate preloads the country sourdough pair (`800` and `1200` wide). Other plates load lazily. No WebP or JPEG is shipped.

## Font

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Caveat Brush (headings, the chalkboard) | `src/fonts/CaveatBrush.woff2` (copied to `public/fonts/` at build) | Impallari Type, via the Fontsource package `@fontsource/caveat-brush` (Latin subset, trimmed to the characters the site uses) | SIL Open Font License 1.1 (`src/fonts/OFL-CaveatBrush.txt`) |
| Bitter, weight axis 100–900 (body text) | `src/fonts/Bitter.woff2` | The Bitter Project Authors, via `@fontsource-variable/bitter` (Latin subset, trimmed to the characters the site uses) | SIL Open Font License 1.1 (`src/fonts/OFL-Bitter.txt`) |
| Special Elite (order tickets and time stamps) | `src/fonts/SpecialElite.woff2` | Astigmatic, via `@fontsource/special-elite` (Latin subset, trimmed to the characters the site uses) | Apache License 2.0 (`src/fonts/LICENSE-SpecialElite.txt`) |

Three families. `@font-face` lives in `src/app/globals.css`. The site does not request Google Fonts or any other third-party origin.

## Other

| Asset | Where | Source | Licence |
| --- | --- | --- | --- |
| Favicon | `src/app/icon.svg` | Drawn for this concept: a flour square and a single ember needle. | Original work |

Fraunces, DM Sans, the soft SVG loaves and the generated sprite were removed in this redesign.

## Content

All business details are invented: the name Kestrel & Kiln, the suburb of Wattlebrook, Millstone Lane, the phone number (a fictional 5550-series number), the `.example` email address, hours, menu, prices, hydration and ferment figures. There are no reviews, testimonials, awards, ratings, statistics or client logos.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Flour | `#F5F2EB` | Page ground |
| Crust ink | `#1A1815` | Text and hairlines |
| Ash | `#6B655B` | Secondary text |
| Kiln ember | `#9B3412` | The only accent: live dot, focus, order action |

Run `npm run contrast -- --strict` for the pairs. Ink, ash and ember each clear 4.5:1 on flour.
