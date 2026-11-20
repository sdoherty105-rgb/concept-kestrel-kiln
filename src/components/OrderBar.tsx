"use client";

import Link from "next/link";
import { cents } from "@/lib/bakery";
import { useOrder } from "./OrderProvider";

export function OrderBar() {
  const { count, total } = useOrder();
  const items = `${count} ${count === 1 ? "item" : "items"}`;

  return (
    <nav className="dock" aria-label="Order" data-has={count > 0 ? "1" : "0"} data-testid="order-bar">
      <Link className="dock-order" href="/#pre-order">
        <span className="nums" aria-live="polite">
          <span className="label">Demonstration</span>
          <strong>{items}</strong>
          <span>{cents(total)}</span>
        </span>
        <span className="dock-action">{count > 0 ? "Review pre-order" : "Order"}</span>
      </Link>
    </nav>
  );
}
