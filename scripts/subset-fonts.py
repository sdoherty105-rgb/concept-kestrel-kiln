"""Re-create the trimmed, self-hosted Hanken Grotesk file in src/fonts.

Source (SIL OFL 1.1): Hanken Grotesk variable, latin, from Fontsource
  https://cdn.jsdelivr.net/fontsource/fonts/hanken-grotesk:vf@5.2.8/latin-wght-normal.woff2
Upstream project: https://github.com/marcologous/hanken-grotesk

Pass the downloaded woff2 path as the first argument. Requires fonttools and brotli.
The weight axis is limited to 200-500 and the glyph set to the Latin characters the site uses.
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "src" / "fonts" / "HankenGrotesk.woff2"

TEXT = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + "\u00b7\u00d7\u00e9\u00e8\u00e0\u2013\u2014\u2018\u2019\u201c\u201d\u2026\u2212"
)

font = TTFont(SRC)
opts = subset.Options()
opts.flavor = "woff2"
opts.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "tnum", "lnum"]
opts.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
opts.notdef_outline = True
opts.hinting = False
sub = subset.Subsetter(opts)
sub.populate(text=TEXT)
sub.subset(font)
font = instancer.instantiateVariableFont(font, {"wght": (200, 500)})
font.flavor = "woff2"
font.save(OUT)
print(OUT.name, OUT.stat().st_size)
