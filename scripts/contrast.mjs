const c = {
  espresso: "#27221E",
  flour: "#F1E8D9",
  gold: "#E2BD7C",
  page: "#FAF7F1",
  terracotta: "#A76549",
  terracottaDeep: "#8A4A32",
  espressoSoft: "#5A4E44",
  goldOnDark: "#E2BD7C",
};

const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const pairs = [
  ["espresso", "page", 4.5],
  ["espresso", "flour", 4.5],
  ["espresso", "gold", 4.5],
  ["espressoSoft", "page", 4.5],
  ["espressoSoft", "flour", 4.5],
  ["page", "espresso", 4.5],
  ["flour", "espresso", 4.5],
  ["gold", "espresso", 4.5],
  ["terracotta", "page", 3],
  ["terracotta", "flour", 3],
  ["terracottaDeep", "page", 4.5],
  ["terracottaDeep", "flour", 4.5],
  ["page", "terracottaDeep", 4.5],
  ["gold", "terracottaDeep", 3],
  ["terracotta", "espresso", 3],
];

let failed = false;
for (const [fg, bg, min] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= min;
  if (!ok && process.argv.includes("--strict")) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${fg.padEnd(15)} on ${bg.padEnd(10)} ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
