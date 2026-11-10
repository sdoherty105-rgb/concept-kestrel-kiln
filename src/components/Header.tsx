import Link from "next/link";
import { OrderCount } from "./OrderCount";

/** Jump links reach the price list, the visit and the order without scrolling through six plates. */
export function Header() {
  return (
    <header className="site-header" data-nav="grid-links">
      <div className="bar">
        <Link href="/" className="brand">
          Kestrel &amp; Kiln
        </Link>
        <nav aria-label="Main">
          <Link href="/#oven" className="nav-wide">
            Bake times
          </Link>
          <Link href="/menu">Prices</Link>
          <Link href="/#visit">Visit</Link>
          <Link href="/#pre-order" className="nav-wide">
            Order
            <OrderCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
