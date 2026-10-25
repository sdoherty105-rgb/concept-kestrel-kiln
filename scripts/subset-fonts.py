"""Re-create the trimmed, self-hosted font files in src/fonts.

Sources (SIL OFL 1.1, via @fontsource-variable/fraunces and @fontsource-variable/dm-sans):
  Fraunces-opsz.woff2, Fraunces-italic.woff2, DMSans.woff2
This script limits the variable axes to the weights the site uses and subsets the glyphs to the
characters the site needs, to keep the first load small. Requires: pip install fonttools brotli
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC = Path(sys.argv[1])  # directory with the original @fontsource-variable woff2 files
OUT = Path(__file__).resolve().parent.parent / "src" / "fonts"

TEXT = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + "\u00a0\u00b7\u00d7\u00e9\u00e8\u00e0\u2013\u2014\u2018\u2019\u201c\u201d\u2026\u2212\u2192"
)

JOBS = [
    ("fraunces-latin-opsz-normal.woff2", "Fraunces-opsz.woff2", {"wght": (400, 600), "opsz": (14, 144)}),
    ("fraunces-latin-wght-italic.woff2", "Fraunces-italic.woff2", None),
    ("dm-sans-latin-wght-normal.woff2", "DMSans.woff2", {"wght": (400, 700)}),
]

for src_name, out_name, limits in JOBS:
    font = TTFont(SRC / src_name)
    if limits:
        font = instancer.instantiateVariableFont(font, limits)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "tnum", "lnum"]
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    opts.notdef_outline = True
    opts.hinting = False
    sub = subset.Subsetter(opts)
    sub.populate(text=TEXT)
    sub.subset(font)
    font.flavor = "woff2"
    font.save(OUT / out_name)
    print(out_name, (OUT / out_name).stat().st_size)
