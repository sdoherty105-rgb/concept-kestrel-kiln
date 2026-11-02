"use client";

import { useHydrated } from "@/lib/useHydrated";
import { MAX_QTY, useOrder } from "./OrderProvider";

export function PlateStepper({ id, name }: { id: string; name: string }) {
  const hydrated = useHydrated();
  const { quantities, addItem, setQty } = useOrder();
  const qty = quantities[id] ?? 0;

  if (!hydrated || qty === 0) {
    const label = (
      <>
        Add to Saturday order
        <span className="visually-hidden"> {name}</span>
      </>
    );
    if (!hydrated) {
      return (
        <a className="text-btn" href="#pre-order">
          {label}
        </a>
      );
    }
    return (
      <button type="button" className="text-btn" onClick={() => addItem(id)}>
        {label}
      </button>
    );
  }

  return (
    <div className="stepper" role="group" aria-label={`${name} quantity`}>
      <button type="button" aria-label={`Remove one ${name}`} onClick={() => setQty(id, qty - 1)}>
        <span aria-hidden="true">−</span>
      </button>
      <output key={qty} aria-live="polite" aria-label={`${qty} in the order`}>
        {qty}
      </output>
      <button
        type="button"
        aria-label={`Add one more ${name}`}
        disabled={qty >= MAX_QTY}
        onClick={() => setQty(id, qty + 1)}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
