"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/bakery";

type OrderState = {
  quantities: Record<string, number>;
  day: string;
  slotId: string;
};

type OrderApi = OrderState & {
  setQty: (id: string, qty: number) => void;
  addItem: (id: string) => void;
  setDay: (day: string) => void;
  setSlotId: (id: string) => void;
  reset: () => void;
  count: number;
  total: number;
  lines: { id: string; name: string; qty: number; price: number }[];
};

const MAX_QTY = 12;
const empty: OrderState = { quantities: {}, day: "", slotId: "" };

const OrderContext = createContext<OrderApi | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OrderState>(empty);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => {
      const next = { ...s.quantities };
      const clamped = Math.max(0, Math.min(MAX_QTY, qty));
      if (clamped === 0) delete next[id];
      else next[id] = clamped;
      return { ...s, quantities: next };
    });
  }, []);

  const addItem = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      quantities: { ...s.quantities, [id]: Math.min(MAX_QTY, (s.quantities[id] ?? 0) + 1) },
    }));
  }, []);

  const api = useMemo<OrderApi>(() => {
    const lines = PRODUCTS.filter((p) => state.quantities[p.id]).map((p) => ({
      id: p.id,
      name: p.name,
      qty: state.quantities[p.id],
      price: p.price,
    }));
    return {
      ...state,
      setQty,
      addItem,
      setDay: (day) => setState((s) => ({ ...s, day })),
      setSlotId: (slotId) => setState((s) => ({ ...s, slotId })),
      reset: () => setState(empty),
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
    };
  }, [state, setQty, addItem]);

  return <OrderContext.Provider value={api}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}

export { MAX_QTY };
