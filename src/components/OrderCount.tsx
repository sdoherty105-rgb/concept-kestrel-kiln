"use client";

import { useOrder } from "./OrderProvider";

export function OrderCount() {
  const { count } = useOrder();
  if (!count) return null;
  return (
    <span className="nums">
      {" "}
      {count}
      <span className="visually-hidden"> in this order</span>
    </span>
  );
}
