"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BAKE_SLOTS, CAFE, PICKUP_DAYS, PRODUCTS, cents } from "@/lib/bakery";
import { useHydrated } from "@/lib/useHydrated";
import { MAX_QTY, useOrder } from "./OrderProvider";

type Errors = Partial<Record<"items" | "day" | "slot" | "name" | "mobile" | "email", string>>;

type Placed = {
  lines: { id: string; name: string; qty: number; price: number }[];
  total: number;
  day: string;
  slotLabel: string;
  name: string;
};

const FIELD_ID: Record<keyof Errors, string> = {
  items: "order-items",
  day: "pickup-day",
  slot: "pickup-slot-group",
  name: "cust-name",
  mobile: "cust-mobile",
  email: "cust-email",
};

export function PreOrder() {
  const hydrated = useHydrated();
  const order = useOrder();
  const uid = useId();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Placed | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(0);

  useEffect(() => {
    if (submitted && Object.keys(errors).length) summaryRef.current?.focus();
  }, [submitted, errors]);

  useEffect(() => {
    if (placed) successRef.current?.focus();
  }, [placed]);

  const slot = BAKE_SLOTS.find((s) => s.id === order.slotId);

  const validate = (): Errors => {
    const e: Errors = {};
    if (order.count === 0) e.items = "Add at least one item to your pre-order.";
    if (!order.day) e.day = "Choose a pickup day.";
    if (!slot) e.slot = "Choose a pickup time.";
    if (!name.trim()) e.name = "Enter a name for the pickup.";
    const digits = mobile.replace(/[\s()+-]/g, "");
    if (!mobile.trim()) e.mobile = "Enter a mobile number so we can reach you about your order.";
    else if (!/^(?:\+?61|0)4\d{8}$/.test(digits)) e.mobile = "Enter an Australian mobile number, for example 0400 000 000.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = "Enter an email address like name@example.com, or leave it blank.";
    if (!e.items && slot) {
      const tooEarly = order.lines.filter((l) => {
        const p = PRODUCTS.find((x) => x.id === l.id)!;
        return BAKE_SLOTS[p.slot].minutes > slot.minutes;
      });
      if (tooEarly.length) {
        const first = PRODUCTS.find((x) => x.id === tooEarly[0].id)!;
        e.slot = `${first.name} comes out of the oven at ${BAKE_SLOTS[first.slot].label}. Choose a later pickup time${
          tooEarly.length > 1 ? ` (${tooEarly.length} items are baked after ${slot.label})` : ""
        } or remove it.`;
      }
    }
    return e;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setSubmitted((n) => n + 1);
    if (Object.keys(e).length) return;
    setPlaced({
      lines: order.lines,
      total: order.total,
      day: order.day,
      slotLabel: slot!.label,
      name: name.trim(),
    });
  };

  const startAgain = () => {
    order.reset();
    setName("");
    setMobile("");
    setEmail("");
    setNotes("");
    setErrors({});
    setPlaced(null);
  };

  const errorKeys = Object.keys(errors) as (keyof Errors)[];
  const err = (k: keyof Errors) => (errors[k] ? `${uid}-${k}-err` : undefined);

  return (
    <section id="pre-order" className="section on-flour" aria-labelledby="order-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Pre-order for pickup</span>
          <h2 id="order-title" className="h2">
            Skip the queue. <em>We&rsquo;ll hold it warm.</em>
          </h2>
          <p className="lede">
            Choose your bakes, pick a day and a time, and we&rsquo;ll have a paper bag waiting with your name on
            it. Pre-orders close {CAFE.preorderCutoff} and are held until {CAFE.holdUntil}. Pay at the counter.
          </p>
        </div>

        <div className="order-layout">
          {placed ? (
            <div className="success" role="status" data-testid="order-success">
              <span className="badge-demo">Demo only</span>
              <h3 ref={successRef} tabIndex={-1}>
                Thanks, {placed.name}. This was a demo, so nothing was sent.
              </h3>
              <p>
                Kestrel &amp; Kiln is a fictional bakery and this form is a demonstration. Your details were not
                stored or sent anywhere. In a live build, this is where the order would reach the bakery and a
                confirmation would arrive by text.
              </p>
              <ul className="summary-list" aria-label="Demo order summary">
                {placed.lines.map((l) => (
                  <li key={l.id}>
                    <span>
                      {l.qty} × {l.name}
                    </span>
                    <span>{cents(l.qty * l.price)}</span>
                  </li>
                ))}
                <li>
                  <strong>Pickup: {placed.day}, {placed.slotLabel}</strong>
                  <strong>{cents(placed.total)}</strong>
                </li>
              </ul>
              <div>
                <button type="button" className="btn" onClick={startAgain}>
                  Start another demo order
                </button>
              </div>
            </div>
          ) : (
            <form className="order-form" onSubmit={onSubmit} noValidate aria-label="Pre-order for pickup (demo)" data-testid="order-form">
              <noscript>
                <p className="noscript-note">
                  The demo pre-order form needs JavaScript to run. Every bake, price and time is still listed
                  above. To order for real you would call the bakery on {CAFE.phone}.
                </p>
              </noscript>

              {errorKeys.length > 0 && (
                <div className="error-summary" role="alert" tabIndex={-1} ref={summaryRef}>
                  <h3>There {errorKeys.length === 1 ? "is 1 problem" : `are ${errorKeys.length} problems`} with your order</h3>
                  <ul>
                    {errorKeys.map((k) => (
                      <li key={k}>
                        <a
                          href={`#${FIELD_ID[k]}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(FIELD_ID[k]);
                            const focusable = el?.matches("input,select,textarea,button")
                              ? el
                              : el?.querySelector<HTMLElement>("input,button");
                            (focusable as HTMLElement | null)?.focus();
                            el?.scrollIntoView({ block: "center" });
                          }}
                        >
                          {errors[k]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <fieldset className="fieldset" id="order-items" aria-describedby={err("items")}>
                <legend>
                  <span className="legend-n" aria-hidden="true">1</span> Choose your bakes
                </legend>
                {errors.items && (
                  <p className="err" id={err("items")} style={{ marginBottom: 14 }}>
                    {errors.items}
                  </p>
                )}
                <div className="order-rows">
                  {PRODUCTS.map((p) => {
                    const qty = order.quantities[p.id] ?? 0;
                    return (
                      <div className="order-row" key={p.id}>
                        <div>
                          <div className="nm" id={`${uid}-nm-${p.id}`}>
                            {p.name}
                          </div>
                          <div className="sub">
                            {cents(p.price)} · out at {BAKE_SLOTS[p.slot].label}
                          </div>
                        </div>
                        <div className="stepper">
                          <button
                            type="button"
                            aria-label={`Remove one ${p.name}`}
                            disabled={!hydrated || qty === 0}
                            onClick={() => order.setQty(p.id, qty - 1)}
                          >
                            <span aria-hidden="true">−</span>
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={MAX_QTY}
                            value={qty}
                            aria-labelledby={`${uid}-nm-${p.id}`}
                            onChange={(e) => order.setQty(p.id, Number.parseInt(e.target.value || "0", 10) || 0)}
                          />
                          <button
                            type="button"
                            aria-label={`Add one ${p.name}`}
                            disabled={!hydrated || qty >= MAX_QTY}
                            onClick={() => order.setQty(p.id, qty + 1)}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="fieldset">
                <legend>
                  <span className="legend-n" aria-hidden="true">2</span> Pickup day and time
                </legend>
                <div className="field">
                  <label htmlFor="pickup-day">
                    Day <span className="req" aria-hidden="true">*</span>
                    <span className="visually-hidden"> (required)</span>
                  </label>
                  <select
                    id="pickup-day"
                    className="input"
                    value={order.day}
                    onChange={(e) => order.setDay(e.target.value)}
                    aria-invalid={errors.day ? true : undefined}
                    aria-describedby={err("day")}
                  >
                    <option value="">Choose a day</option>
                    {PICKUP_DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.day && (
                    <p className="err" id={err("day")}>
                      {errors.day}
                    </p>
                  )}
                  <p className="hint">Closed Mondays.</p>
                </div>
                <div className="field" id="pickup-slot-group" role="radiogroup" aria-labelledby={`${uid}-slot-lbl`} aria-describedby={err("slot")}>
                  <span className="lbl" id={`${uid}-slot-lbl`}>
                    Pickup time <span className="req" aria-hidden="true">*</span>
                    <span className="visually-hidden"> (required)</span>
                  </span>
                  <div className="time-pills">
                    {BAKE_SLOTS.map((s) => (
                      <label className="time-pill" key={s.id}>
                        <input
                          type="radio"
                          name="pickup-slot"
                          value={s.id}
                          checked={order.slotId === s.id}
                          onChange={() => order.setSlotId(s.id)}
                        />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.slot && (
                    <p className="err" id={err("slot")}>
                      {errors.slot}
                    </p>
                  )}
                  <p className="hint">Times match the bake schedule above, so everything is at its best.</p>
                </div>
              </fieldset>

              <fieldset className="fieldset">
                <legend>
                  <span className="legend-n" aria-hidden="true">3</span> Your details
                </legend>
                <div className="field">
                  <label htmlFor="cust-name">
                    Name for the bag <span className="req" aria-hidden="true">*</span>
                    <span className="visually-hidden"> (required)</span>
                  </label>
                  <input
                    id="cust-name"
                    className="input"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={err("name")}
                  />
                  {errors.name && (
                    <p className="err" id={err("name")}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="cust-mobile">
                      Mobile <span className="req" aria-hidden="true">*</span>
                      <span className="visually-hidden"> (required)</span>
                    </label>
                    <input
                      id="cust-mobile"
                      className="input"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      aria-invalid={errors.mobile ? true : undefined}
                      aria-describedby={err("mobile")}
                    />
                    {errors.mobile && (
                      <p className="err" id={err("mobile")}>
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="cust-email">
                      Email <span className="opt">(optional)</span>
                    </label>
                    <input
                      id="cust-email"
                      className="input"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={err("email")}
                    />
                    {errors.email && (
                      <p className="err" id={err("email")}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cust-notes">
                    Notes <span className="opt">(optional)</span>
                  </label>
                  <textarea
                    id="cust-notes"
                    className="input"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Sliced, please. Allergies. Birthday candles."
                  />
                </div>
              </fieldset>

              <div>
                <button type="submit" className="btn" disabled={!hydrated}>
                  Place demo pre-order
                </button>
                <p className="hint" style={{ marginTop: 12 }}>
                  Demo only. This form validates in your browser and never sends anything anywhere.
                </p>
              </div>
            </form>
          )}

          <div className="ticket-wrap">
            <aside className="ticket" aria-labelledby="ticket-title" data-testid="ticket">
              <h3 id="ticket-title">Your pickup ticket</h3>
              <div aria-live="polite">
                {order.lines.length === 0 ? (
                  <p className="ticket-empty">Nothing here yet. Add a loaf or two and it will appear on your ticket.</p>
                ) : (
                  <ul>
                    {order.lines.map((l) => (
                      <li key={l.id}>
                        <span>
                          {l.qty} × {l.name}
                        </span>
                        <span>{cents(l.qty * l.price)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <dl>
                <div>
                  <dt>Pickup</dt>
                  <dd>{order.day || slot ? `${order.day || "Day?"} · ${slot?.label ?? "Time?"}` : "Choose a day and time"}</dd>
                </div>
                <div>
                  <dt>Total, pay at pickup</dt>
                  <dd className="total" data-testid="ticket-total">
                    {cents(order.total)}
                  </dd>
                </div>
              </dl>
              <p className="demo-note">
                Fictional bakery, invented prices. Nothing on this page is a real order.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
