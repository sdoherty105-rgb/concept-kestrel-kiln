const c = {
  ink: "#1A1815",
  flour: "#F5F2EB",
  ash: "#6B655B",
  ember: "#B3431F",
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
  ["ink", "flour", 4.5],
  ["ash", "flour", 4.5],
  ["ember", "flour", 4.5],
  ["flour", "ink", 4.5],
  ["flour", "ember", 4.5],
];

let failed = false;
for (const [fg, bg, min] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= min;
  if (!ok && process.argv.includes("--strict")) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${fg.padEnd(8)} on ${bg.padEnd(8)} ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
