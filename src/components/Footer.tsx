import Link from "next/link";
import { CAFE, SITE } from "@/lib/bakery";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        Kestrel &amp; Kiln is a fictional bakery. The menu, prices, address, phone number and hours are invented
        demonstration data, and the order form does not send or store anything.
      </p>
      <p className="footer-studio">
        <a href={SITE.enquiryUrl} className="footer-cta">
          Want a website like this?
        </a>
        <a href={SITE.conceptUrl}>Back to the concept</a>
      </p>
      <p>
        <Link href="/menu">Price list</Link>
        <a href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a>
        <span>{CAFE.email}</span>
      </p>
      <div className="footer-credit" data-footer-credit>
        <span>Designed by</span>
        <a href={SITE.studioUrl} rel="noopener">
          <img
            src="/brand/offshift-wordmark-dark.svg"
            alt="OFF/SHIFT Studio"
            width={88}
            height={24}
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
        </a>
      </div>
    </footer>
  );
}
