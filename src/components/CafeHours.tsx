"use client";

import { useEffect, useState } from "react";
import { HOURS, openStatus, perthNow } from "@/lib/bakery";

export function CafeHours() {
  const [now, setNow] = useState<{ minutes: number; weekday: number } | null>(null);

  useEffect(() => {
    setNow(perthNow());
    const t = setInterval(() => setNow(perthNow()), 60_000);
    return () => clearInterval(t);
  }, []);

  const status = now ? openStatus(now) : null;

  return (
    <div>
      <table className="hours">
        <caption className="visually-hidden">Cafe opening hours, Perth time</caption>
        <tbody>
          {HOURS.map((h) => (
            <tr key={h.day} data-today={now ? h.days.includes(now.weekday) : undefined}>
              <th scope="row">
                {h.day}
                {now && h.days.includes(now.weekday) ? <span className="visually-hidden"> (today)</span> : null}
              </th>
              <td>{h.open}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="open-status" aria-live="polite">
        <span className="dot" aria-hidden="true" style={{ background: status?.open ? "#5C6A3B" : "var(--terracotta-deep)" }} />
        <span>{status ? status.text : "Open Tuesday to Sunday. Closed Mondays."}</span>
      </p>
    </div>
  );
}
