const c = {
  rye: "#2E2218",
  oat: "#F2E2C0",
  paper: "#FFFAEE",
  sheet: "#E8D3A6",
  crust: "#8A3F14",
  ash: "#5E4B3A",
  ember: "#9B3412",
  board: "#25302B",
  chalk: "#FBFAF4",
  yellow: "#F3D36B",
  pink: "#EE8F8F",
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
  ["rye", "oat", 4.5],
  ["rye", "paper", 4.5],
  ["ash", "oat", 4.5],
  ["ash", "paper", 4.5],
  ["crust", "oat", 4.5],
  ["crust", "paper", 4.5],
  ["ember", "oat", 4.5],
  ["ember", "paper", 4.5],
  ["ember", "sheet", 4.5],
  ["rye", "sheet", 4.5],
  ["paper", "ember", 4.5],
  ["chalk", "board", 4.5],
  ["yellow", "board", 4.5],
  ["pink", "board", 4.5],
  ["board", "yellow", 4.5],
];

let failed = false;
for (const [fg, bg, min] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= min;
  if (!ok && process.argv.includes("--strict")) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"} ${fg.padEnd(8)} on ${bg.padEnd(8)} ${r.toFixed(2)}:1 (min ${min})`);
}
process.exit(failed ? 1 : 0);
