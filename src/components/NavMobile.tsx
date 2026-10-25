"use client";

import Link from "next/link";
import { useRef } from "react";

const LINKS = [
  { href: "/#bakes", label: "Bakes" },
  { href: "/#oven", label: "In the oven" },
  { href: "/#process", label: "Process" },
  { href: "/#cafe", label: "Cafe" },
  { href: "/menu", label: "Full menu" },
];

export function NavMobile() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => menu.current?.removeAttribute("open");

  return (
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
  );
}
