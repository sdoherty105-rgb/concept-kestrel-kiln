"use client";

import { useEffect, useState } from "react";
import { BAKE_SLOTS, PRODUCTS, openStatus, perthNow, slotProducts } from "@/lib/bakery";

const FEATURED = ["country-sourdough", "butter-croissant", "kouign-amann", "spelt-batard"];

function statusLine(): { text: string; live: boolean } {
  const now = perthNow();
  const open = openStatus(now);
  if (now.weekday === 1) return { text: open.text, live: false };
  const upcoming = BAKE_SLOTS.findIndex((s) => s.minutes > now.minutes);
  const lastOut = BAKE_SLOTS.map((s) => s.minutes <= now.minutes).lastIndexOf(true);
  if (lastOut >= 0 && now.minutes < 15 * 60) {
    const fresh = slotProducts(lastOut)
      .map((p) => p.name)
      .join(", ");
    const nextBit = upcoming >= 0 ? ` Next out at ${BAKE_SLOTS[upcoming].label}.` : "";
    return { text: `Latest out of the kiln: ${fresh}.${nextBit}`, live: true };
  }
  if (upcoming >= 0 && now.minutes < BAKE_SLOTS[0].minutes) {
    return { text: `First loaves come out at ${BAKE_SLOTS[0].label}.`, live: true };
  }
  return { text: open.text, live: false };
}

export function TodayBake() {
  const [status, setStatus] = useState<{ text: string; live: boolean } | null>(null);

  useEffect(() => {
    setStatus(statusLine());
    const t = setInterval(() => setStatus(statusLine()), 60_000);
    return () => clearInterval(t);
  }, []);

  const items = FEATURED.map((id) => PRODUCTS.find((p) => p.id === id)!);

  return (
    <aside className="today" aria-labelledby="today-title" data-testid="today-bake">
      <h2 id="today-title">
        Today&rsquo;s bake <span>Perth time</span>
      </h2>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <span>{p.name}</span>
            <time>{BAKE_SLOTS[p.slot].label}</time>
          </li>
        ))}
      </ul>
      <p className="status">
        <span className={`dot ${status?.live ? "live" : ""}`} aria-hidden="true" />
        <span>{status ? status.text : "Fresh from the kiln from 6:30 am, Tuesday to Sunday."}</span>
      </p>
    </aside>
  );
}
