"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { KestrelMark } from "./Illustrations";

const LINKS = [
  { href: "/#bakes", label: "Bakes" },
  { href: "/#oven", label: "In the oven" },
  { href: "/#process", label: "Process" },
  { href: "/#cafe", label: "Cafe" },
  { href: "/menu", label: "Full menu" },
];

export function Header() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => menu.current?.removeAttribute("open");

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Kestrel & Kiln, home">
          <KestrelMark />
          <span>Kestrel &amp; Kiln</span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/#pre-order" className="btn btn-sm">
            Pre-order
          </Link>
          <details className="nav-mobile" ref={menu}>
            <summary>
              <span>Menu</span>
              <span className="visually-hidden"> — site navigation</span>
            </summary>
            <nav className="panel" aria-label="Main, mobile">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={close}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
