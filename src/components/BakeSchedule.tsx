"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BAKE_SLOTS, CAFE, PRODUCTS, cents, perthNow, slotProducts } from "@/lib/bakery";
import { useHydrated } from "@/lib/useHydrated";
import { useOrder } from "./OrderProvider";
import { TodayBake } from "./TodayBake";

type State = "out" | "fresh" | "next" | "later" | "static";

const CHIP: Record<State, string> = {
  out: "On the counter",
  fresh: "Fresh out of the kiln",
  next: "Next out of the oven",
  later: "Still in the oven",
  static: "Scheduled",
};

function stateFor(index: number, selected: number | null): State {
  if (selected === null) return "static";
  if (index < selected) return "out";
  if (index === selected) return "fresh";
  if (index === selected + 1) return "next";
  return "later";
}

function nowSlot(): number | null {
  const now = perthNow();
  if (now.weekday === 1) return null;
  if (now.minutes < BAKE_SLOTS[0].minutes || now.minutes >= 15 * 60) return null;
  let idx = 0;
  BAKE_SLOTS.forEach((s, i) => {
    if (now.minutes >= s.minutes) idx = i;
  });
  return idx;
}

function listNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function Needle() {
  const [minutes, setMinutes] = useState(() => perthNow().minutes);

  useEffect(() => {
    const tick = () => setMinutes(perthNow().minutes);
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock-rail" aria-hidden="true">
      <span className="clock-line" />
      <span className="clock-bound nums" style={{ left: "0%" }}>
        0
      </span>
      <span className="clock-bound nums" style={{ left: "100%" }}>
        24
      </span>
      {BAKE_SLOTS.map((slot) => (
        <span
          key={slot.id}
          className="clock-tick"
          style={{ left: `${(slot.minutes / 1440) * 100}%` }}
        />
      ))}
      <span className="clock-needle" style={{ left: `${(minutes / 1440) * 100}%` }} />
    </div>
  );
}

export function BakeSchedule() {
  const hydrated = useHydrated();
  const { setSlotId, slotId } = useOrder();
  const [selected, setSelected] = useState<number>(2);
  const sel = hydrated ? selected : null;
  const [nowNote, setNowNote] = useState("");

  const onCounter = sel === null ? [] : PRODUCTS.filter((p) => p.slot <= sel);
  const fresh = sel === null ? [] : slotProducts(sel).map((p) => p.name);
  const next = sel !== null && sel + 1 < BAKE_SLOTS.length ? BAKE_SLOTS[sel + 1] : null;
  const nextNames = next ? slotProducts(sel! + 1).map((p) => p.name) : [];

  const choose = (i: number) => {
    setSelected(i);
    setNowNote("");
  };

  const jumpToNow = () => {
    const idx = nowSlot();
    if (idx === null) {
      setNowNote(
        "The kitchen is not baking right now, so the clock stays where you left it. Doors open Tuesday to Sunday from 6:30 am.",
      );
      return;
    }
    setSelected(idx);
    setNowNote("Showing the bake that is current in Perth right now.");
  };

  return (
    <section id="oven" className="clock-plate" data-layout="bake-clock" aria-labelledby="oven-title">
      <div className="clock-copy">
        <p className="label">Bake clock</p>
        <h2 id="oven-title" className="plate-name">
          The day
        </h2>
        <p className="plate-sentence">
          One line for twenty-four hours. The needle is Perth time. Each tick is a bake. Demonstration schedule.
        </p>
        <TodayBake />
      </div>

      <Needle />

      <div className="scrubber" data-testid="scrubber">
        <h3 id="clock-label" className="label">
          Set the clock
        </h3>
        {hydrated ? (
          <div className="pills" role="radiogroup" aria-labelledby="clock-label">
            {BAKE_SLOTS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={selected === i}
                className="pill"
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    const n = (i + 1) % BAKE_SLOTS.length;
                    choose(n);
                    (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const n = (i - 1 + BAKE_SLOTS.length) % BAKE_SLOTS.length;
                    choose(n);
                    (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
                  }
                }}
                tabIndex={selected === i ? 0 : -1}
              >
                {s.label}
              </button>
            ))}
            <button type="button" className="pill pill-now" onClick={jumpToNow}>
              Now
            </button>
          </div>
        ) : (
          <p className="plate-sentence">Every bake and its time is listed below.</p>
        )}
        <div className="readout" aria-live="polite" data-testid="readout">
          {sel !== null ? (
            <>
              <strong>
                At {BAKE_SLOTS[sel].label}: {onCounter.length} {onCounter.length === 1 ? "bake" : "bakes"} on the counter
              </strong>
              <p>Fresh out: {listNames(fresh)}.</p>
              <p className="readout-note">
                {next
                  ? `Next, at ${next.label}: ${listNames(nextNames)}.`
                  : "That is the last bake of the morning. Whatever is left is on the counter until we close."}
              </p>
              {nowNote ? <p className="readout-note">{nowNote}</p> : null}
            </>
          ) : (
            <p>
              Seven bakes between {BAKE_SLOTS[0].label} and {BAKE_SLOTS[6].label}, Tuesday to Sunday.
            </p>
          )}
        </div>
      </div>

      <ol className="timeline" aria-label="Today's bake schedule">
        {BAKE_SLOTS.map((slot, i) => {
          const state = stateFor(i, sel);
          const items = slotProducts(i);
          return (
            <li key={slot.id} className="slot" data-state={state} data-testid={`slot-${slot.id}`}>
              <div className="slot-time">
                <time
                  className="nums"
                  dateTime={`${String(Math.floor(slot.minutes / 60)).padStart(2, "0")}:${String(slot.minutes % 60).padStart(2, "0")}`}
                >
                  {slot.label}
                </time>
                <span className="slot-note">{slot.note}</span>
              </div>
              <span className="slot-chip">{CHIP[state]}</span>
              <ul className="slot-items">
                {items.map((p) => (
                  <li key={p.id}>
                    <span className="nm">{p.name}</span>
                    <span className="pr nums">{cents(p.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="slot-foot">
                <Link
                  href="/#pre-order"
                  onClick={() => {
                    setSlotId(slot.id);
                  }}
                  aria-current={slotId === slot.id ? "true" : undefined}
                >
                  Pre-order for a {slot.label} pickup
                </Link>
              </div>
            </li>
          );
        })}
        <li className="slot slot-rules">
          <h3>How an order works</h3>
          <ul>
            <li>Order up to {CAFE.preorderCutoff}.</li>
            <li>Pick a time at or after the bake you want.</li>
            <li>{CAFE.holdRule} Then it goes on the counter.</li>
            <li>Pay at pickup. Closed Mondays. Demonstration only.</li>
          </ul>
        </li>
      </ol>
    </section>
  );
}
