import Link from "next/link";
import { OrderCount } from "./OrderCount";

export function Header() {
  return (
    <header className="site-header" data-nav="grid-links">
      <div className="bar">
        <Link href="/" className="brand">
          Kestrel &amp; Kiln
        </Link>
        <nav aria-label="Main">
          <Link href="/#bakes">Bakes</Link>
          <Link href="/#visit">Hours</Link>
          <Link href="/#pre-order">
            Order
            <OrderCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
