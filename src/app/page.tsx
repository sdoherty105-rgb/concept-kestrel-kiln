import Link from "next/link";
import { BakeSchedule } from "@/components/BakeSchedule";
import { CafeHours } from "@/components/CafeHours";
import { StaticSvg } from "@/components/Illustrations";
import { ART } from "@/generated/art";
import { PreOrder } from "@/components/PreOrder";
import { ProductCard } from "@/components/ProductCard";
import { TodayBake } from "@/components/TodayBake";
import { CAFE, PRODUCTS, PROCESS } from "@/lib/bakery";

const arrow = (
  <svg className="arrow" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const featured = (cat: "loaf" | "pastry") =>
    PRODUCTS.filter((p) => p.category === cat).slice(0, 4);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Wattlebrook, Perth · Baked from 6:30 am</span>
            <h1 id="hero-title">
              <span className="line">GOOD THINGS</span>
              <span className="line">
                TAKE <em>TIME.</em>
              </span>
            </h1>
            <p className="lede">
              Kestrel &amp; Kiln is a neighbourhood bakery and cafe where every loaf rests overnight and every
              croissant is folded by hand. Order ahead, and your bag is waiting when you arrive.
            </p>
            <div className="cta-row">
              <Link href="/#pre-order" className="btn">
                Pre-order for pickup {arrow}
              </Link>
              <Link href="/#oven" className="btn btn-ghost">
                See what&rsquo;s in the oven
              </Link>
            </div>
            <div className="hero-meta">
              <span>Open Tuesday to Sunday</span>
              <span>14 Millstone Lane</span>
              <span>Pay at pickup</span>
            </div>
          </div>
          <div className="hero-art">
            <StaticSvg className="hero-svg" html={ART.hero} />
            <TodayBake />
          </div>
        </div>
      </section>

      <div className="band" aria-label="What we stand for">
        <ul>
          <li>Slow-fermented</li>
          <li>Stone-milled local flour</li>
          <li>Butter, not shortcuts</li>
          <li>Baked in the kiln</li>
        </ul>
      </div>

      <section id="bakes" className="section" aria-labelledby="bakes-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Signature loaves &amp; pastries</span>
            <h2 id="bakes-title" className="h2">
              The ones we&rsquo;d <em>bake every day.</em>
            </h2>
            <p className="lede">
              A short list, done properly. Add anything to your pre-order and choose a pickup time when you&rsquo;re
              ready.
            </p>
          </div>

          <div className="product-group">
            <div className="group-title">
              <h3>Loaves</h3>
              <p>Naturally leavened, baked on stone.</p>
            </div>
            <ul className="product-grid">
              {featured("loaf").map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </ul>
          </div>

          <div className="product-group">
            <div className="group-title">
              <h3>Pastries</h3>
              <p>Laminated by hand, baked in small batches.</p>
            </div>
            <ul className="product-grid">
              {featured("pastry").map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </ul>
          </div>

          <p style={{ marginTop: 40 }}>
            <Link href="/menu" className="btn btn-ghost">
              See the full bake list {arrow}
            </Link>
          </p>
        </div>
      </section>

      <BakeSchedule />

      <section id="process" className="section" aria-labelledby="process-title">
        <div className="wrap">
          <div className="process-intro">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">The process</span>
              <h2 id="process-title" className="h2">
                Slow ferment, <em>local flour.</em>
              </h2>
              <p className="lede">
                There&rsquo;s no secret. Good flour, a living starter, cold time and a hot kiln. We simply
                refuse to skip the waiting.
              </p>
            </div>
            <blockquote className="pullquote" style={{ margin: 0 }}>
              Flavour is what&rsquo;s left when you stop hurrying.
            </blockquote>
          </div>
          <ol className="process-grid">
            {PROCESS.map((s) => (
              <li className="step reveal" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="process-field" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART.wheatField }} />
        </div>
      </section>

      <section id="cafe" className="section on-flour" aria-labelledby="cafe-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The cafe</span>
            <h2 id="cafe-title" className="h2">
              Stay a while, <em>or take it home.</em>
            </h2>
            <p className="lede">
              A sunny corner room on Millstone Lane with a long communal table, a terrace for dogs and slow
              coffee, and the kiln at the back so you can watch the next bake go in.
            </p>
          </div>
          <div className="cafe-grid">
            <div className="cafe-card reveal" style={{ background: "var(--page)" }}>
              <div>
                <h3>Hours</h3>
                <CafeHours />
              </div>
              <div>
                <h3>Find us</h3>
                <address className="address">
                  {CAFE.address[0]}
                  <br />
                  {CAFE.address[1]}
                  <br />
                  <a href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a>
                </address>
                <ul className="facts" style={{ marginTop: 16 }}>
                  <li>Street parking on Millstone Lane; bike rack by the door.</li>
                  <li>Step-free entry and a wheelchair-accessible restroom.</li>
                  <li>Dogs welcome on the terrace.</li>
                </ul>
              </div>
            </div>
            <div className="map reveal">
              <StaticSvg className="map-svg" html={ART.map} />
              <p className="map-note">Illustrative map of a fictional suburb.</p>
            </div>
          </div>
        </div>
      </section>

      <PreOrder />
    </>
  );
}
