import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test, expect } from "@playwright/test";

const FORBIDDEN = /[→←↑↓⇒➜➤▸▶►•✓✔★☆✦]|(?:->)/;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) out.push(...walk(path));
    else if (/\.(tsx|ts|css)$/.test(name)) out.push(path);
  }
  return out;
}

test("src has no decorative arrow, bullet, tick or star glyphs in UI source", () => {
  const root = join(process.cwd(), "src");
  const offenders: string[] = [];
  for (const file of walk(root)) {
    const text = readFileSync(file, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      if (FORBIDDEN.test(line)) offenders.push(`${file}:${i + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  expect(offenders, offenders.join("\n")).toEqual([]);
});
