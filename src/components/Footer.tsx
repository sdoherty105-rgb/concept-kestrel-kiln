import Link from "next/link";
import { CAFE, SITE } from "@/lib/bakery";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">
              Kestrel
              <br />
              <em>&amp; Kiln</em>
            </p>
          </div>
          <div>
            <h2>Find us</h2>
            <address className="address" style={{ fontStyle: "normal" }}>
              {CAFE.address[0]}
              <br />
              {CAFE.address[1]}
              <br />
              <a href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a>
              <br />
              <span>{CAFE.email}</span>
            </address>
          </div>
          <div>
            <h2>Hours</h2>
            <ul>
              <li>Tue–Sat: 6:30 am – 3 pm</li>
              <li>Sunday: 7 am – 2 pm</li>
              <li>Monday: closed</li>
            </ul>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li>
                <Link href="/#bakes">Signature bakes</Link>
              </li>
              <li>
                <Link href="/#oven">What&rsquo;s in the oven</Link>
              </li>
              <li>
                <Link href="/menu">Full menu</Link>
              </li>
              <li>
                <Link href="/#pre-order">Pre-order for pickup</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <p>
            Kestrel &amp; Kiln is a fictional bakery. Its menu, prices, address, phone number and hours are
            invented for demonstration, and the pre-order form does not send or store anything.
          </p>
          <p>
            <a href={SITE.conceptUrl} target="_blank" rel="noopener">
              {SITE.conceptLabel}
            </a>
            {" · "}Designed by{" "}
            <a href={SITE.studioUrl} target="_blank" rel="noopener">
              OFF/SHIFT Studio
            </a>
            , Perth.
          </p>
        </div>
      </div>
    </footer>
  );
}
