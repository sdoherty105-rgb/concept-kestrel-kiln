"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cents } from "@/lib/bakery";
import { useOrder } from "./OrderProvider";

export function OrderBar() {
  const { count, total } = useOrder();
  const pathname = usePathname();
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const target = document.getElementById("pre-order");
    if (!target) {
      setFormInView(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.intersectionRatio > 0.15), {
      threshold: [0, 0.15, 0.4],
    });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  const show = count > 0 && !formInView;

  return (
    <div className="order-bar" data-show={show} data-testid="order-bar">
      <p aria-live="polite">
        <strong>
          {count} {count === 1 ? "item" : "items"}
        </strong>{" "}
        {cents(total)}
      </p>
      <Link href="/#pre-order" className="btn btn-gold btn-sm" tabIndex={show ? 0 : -1}>
        Review pre-order
      </Link>
    </div>
  );
}
