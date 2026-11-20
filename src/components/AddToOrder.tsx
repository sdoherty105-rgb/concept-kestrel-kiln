"use client";

import Link from "next/link";
import { useHydrated } from "@/lib/useHydrated";
import { MAX_QTY, useOrder } from "./OrderProvider";

export function AddToOrder({ id, name, compact = false }: { id: string; name: string; compact?: boolean }) {
  const hydrated = useHydrated();
  const { quantities, addItem, setQty } = useOrder();
  const qty = quantities[id] ?? 0;
  const cls = compact ? "btn btn-xs" : "btn btn-sm";

  if (!hydrated) {
    return (
      <Link href="/#pre-order" className={cls}>
        Add<span className="visually-hidden"> {name}</span>
      </Link>
    );
  }

  if (qty === 0) {
    return (
      <button type="button" className={cls} onClick={() => addItem(id)}>
        Add<span className="visually-hidden"> {name}</span>
      </button>
    );
  }

  return (
    <div className="stepper" role="group" aria-label={`${name} quantity`}>
      <button type="button" aria-label={`Remove one ${name}`} onClick={() => setQty(id, qty - 1)}>
        <span aria-hidden="true">−</span>
      </button>
      <output aria-live="polite" aria-label={`${qty} in pre-order`}>
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
