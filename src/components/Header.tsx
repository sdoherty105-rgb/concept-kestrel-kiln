import Link from "next/link";
import { KestrelMark } from "./Illustrations";
import { NavMobile } from "./NavMobile";

const LINKS = [
  { href: "/#bakes", label: "Bakes" },
  { href: "/#oven", label: "In the oven" },
  { href: "/#process", label: "Process" },
  { href: "/#cafe", label: "Cafe" },
  { href: "/menu", label: "Full menu" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Kestrel & Kiln, home">
          <KestrelMark />
          <span>Kestrel &amp; Kiln</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/#pre-order" className="btn btn-sm">
            Pre-order
          </Link>
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
