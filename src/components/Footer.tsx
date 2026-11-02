import Link from "next/link";
import { CAFE, SITE } from "@/lib/bakery";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Kestrel &amp; Kiln is a fictional bakery. The menu, prices, address, phone number and hours are invented
        demonstration data, and the order form does not send or store anything.
      </p>
      <p>
        <a href={SITE.conceptUrl} target="_blank" rel="noopener">
          {SITE.conceptLabel}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
      <p>
        <a href={SITE.studioUrl} target="_blank" rel="noopener">
          OFF/SHIFT Studio
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <Link href="/menu">Price list</Link>
        <a href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a>
        <span>{CAFE.email}</span>
      </p>
    </footer>
  );
}
