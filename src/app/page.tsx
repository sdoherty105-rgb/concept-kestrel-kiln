import Link from "next/link";
import { BakeSchedule } from "@/components/BakeSchedule";
import { CafeHours } from "@/components/CafeHours";
import { PreOrder } from "@/components/PreOrder";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { AddToOrder } from "@/components/AddToOrder";
import { TodayBake } from "@/components/TodayBake";
import { CAFE, PRODUCTS, cents } from "@/lib/bakery";

export default function Home() {
  const counter = [PRODUCTS[0], PRODUCTS[5], PRODUCTS[7]];
  return (
    <>
      <section className="bakery-front wrap" aria-labelledby="bakery-title">
        <div className="front-note"><span>Neighbourhood bakery &amp; cafe</span><span>Wattlebrook, Perth</span></div>
        <h1 id="bakery-title" className="bakery-masthead">Kestrel <i>&amp;</i> Kiln</h1>
        <div className="front-intro"><p>Long-fermented bread.<br />Pastry folded by hand. Coffee from 6:30.</p><Link href="/#pre-order" className="counter-link">Pre-order for pickup</Link></div>
        <ul className="front-counter" aria-label="From the bakery counter">
          {counter.map((p, i) => <li key={p.id} className="counter-piece">
            <div className="counter-caption"><span>{String(i + 1).padStart(2, "0")}</span><span>{p.category === "loaf" ? "The daily loaf" : "From the pastry bench"}</span></div>
            <div className="counter-art"><ProductArt kind={p.art} /></div>
            <div className="counter-name"><h2>{p.name}</h2><span>{cents(p.price)}</span></div>
            <AddToOrder id={p.id} name={p.name} compact />
          </li>)}
        </ul>
        <div className="counter-foot"><p>14 Millstone Lane. Tuesday to Sunday.</p><Link href="/menu">The full bake list</Link></div>
      </section>
      <section id="bakes" className="section bakery-bakes" aria-labelledby="bakes-title"><div className="wrap">
        <div className="bakery-heading"><span className="bakery-kicker">From our counter</span><h2 id="bakes-title">A loaf for the week.<br /><em>Something for the walk home.</em></h2><p>Choose your bakes, then a pickup time. We&rsquo;ll have your bag ready at the counter.</p></div>
        <div className="product-group"><div className="group-title"><h3>Bread</h3><p>Stone-milled flour. An overnight ferment.</p></div><ul className="product-grid">{PRODUCTS.filter(p => p.category === "loaf").map(p => <ProductCard key={p.id} p={p} />)}</ul></div>
        <div className="product-group"><div className="group-title"><h3>Pastry</h3><p>Butter, layers and an early start.</p></div><ul className="product-grid">{PRODUCTS.filter(p => p.category === "pastry").map(p => <ProductCard key={p.id} p={p} />)}</ul></div>
      </div></section>
      <BakeSchedule />
      <section id="process" className="bakery-story section" aria-labelledby="process-title"><div className="wrap story-grid">
        <span className="bakery-kicker">At the bakery</span>
        <div><h2 id="process-title">Flour. Water.<br />A little patience.</h2><p>Our sourdough starts the day before you buy it. We mix stone-milled wheat and rye with a living starter, then leave the dough overnight. In the morning, each loaf goes onto the hot stone deck.</p><p>The pastry bench runs alongside it: cold butter folded into dough, trays shaped by hand, then baked through the morning.</p><Link className="counter-link" href="/#oven">Find your bake time</Link></div>
        <TodayBake />
      </div></section>
      <section id="cafe" className="section bakery-visit" aria-labelledby="cafe-title"><div className="wrap visit-grid">
        <div><span className="bakery-kicker">Come by</span><h2 id="cafe-title">Your morning,<br /><em>at Millstone Lane.</em></h2><p>A coffee at the communal table, a loaf for later, or a seat on the terrace with the dog.</p><address>{CAFE.address[0]}<br />{CAFE.address[1]}</address><a className="counter-link" href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a></div>
        <div><h3>Opening hours</h3><CafeHours /><p className="visit-small">Street parking on Millstone Lane.<br />Step-free entry. Dogs welcome on the terrace.</p></div>
      </div></section>
      <PreOrder />
    </>
  );
}

