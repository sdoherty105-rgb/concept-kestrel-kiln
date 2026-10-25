"use client";

import { useEffect, useState } from "react";
import { BAKE_SLOTS, openStatus, perthNow, slotProducts } from "@/lib/bakery";

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

export function TodayBakeStatus({ initial }: { initial: { text: string; live: boolean } }) {
  const [status, setStatus] = useState(initial);

  useEffect(() => {
    setStatus(statusLine());
    const t = setInterval(() => setStatus(statusLine()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <p className="status">
      <span className={`dot ${status.live ? "live" : ""}`} aria-hidden="true" />
      <span>{status.text}</span>
    </p>
  );
}
