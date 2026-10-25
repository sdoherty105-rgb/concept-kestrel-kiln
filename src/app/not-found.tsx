import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" aria-labelledby="nf-title">
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1 id="nf-title">
          Nothing in <em>this oven.</em>
        </h1>
        <p className="lede">That page has gone stale, or never made it out of the kiln. Try the bakes instead.</p>
        <div className="cta-row" style={{ marginTop: 28 }}>
          <Link href="/" className="btn">
            Back to the bakery
          </Link>
          <Link href="/menu" className="btn btn-ghost">
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
