import type { Metadata } from "next";
import Link from "next/link";
import { AddToOrder } from "@/components/AddToOrder";
import { ProductArt } from "@/components/ProductArt";
import { BAKE_SLOTS, CAFE, PRODUCTS, cents } from "@/lib/bakery";

export const metadata: Metadata = {
  title: "The bake list",
  description:
    "Every loaf and pastry at Kestrel & Kiln, a fictional Perth bakery, with prices and the time each bake comes out of the oven. Concept website by OFF/SHIFT Studio.",
  alternates: { canonical: "/menu" },
};

const CAFE_MENU = [
  { name: "Flat white", sub: "Single-origin espresso, silky milk", price: "$4.80" },
  { name: "Long black", sub: "Double shot over hot water", price: "$4.50" },
  { name: "Batch brew", sub: "Filter coffee, refills while you linger", price: "$4.20" },
  { name: "Spiced hot chocolate", sub: "Dark chocolate, cardamom, steamed milk", price: "$5.80" },
  { name: "Sourdough toast", sub: "Cultured butter and house jam", price: "$8.50" },
  { name: "Ham, gruyère & mustard croissant", sub: "Warmed through, served with pickles", price: "$12.50" },
  { name: "Soft egg on rye", sub: "Herb butter, chilli crisp, watercress", price: "$16.50" },
];

function BakeList({ category }: { category: "loaf" | "pastry" }) {
  return (
    <ul className="menu-list">
      {PRODUCTS.filter((p) => p.category === category).map((p) => (
        <li className="menu-item" key={p.id} data-testid="menu-item">
          <div className="art">
            <ProductArt kind={p.art} />
          </div>
          <div>
            <h3>
              <span>{p.name}</span>
              <span className="price">{cents(p.price)}</span>
            </h3>
            <p>{p.detail}</p>
            <div className="menu-foot">
              <span className="out-at">Out at {BAKE_SLOTS[p.slot].label}</span>
              <AddToOrder id={p.id} name={p.name} compact />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function MenuPage() {
  return (
    <>
      <section className="page-hero menu-page" aria-labelledby="menu-title">
        <div className="wrap">
          <span className="eyebrow">Full menu</span>
          <h1 id="menu-title">
            The bake <em>list.</em>
          </h1>
          <p className="lede">
            Everything from the kiln and the counter, with the time each bake comes out. Bakery items can be
            pre-ordered for pickup. Cafe items are made to order when you visit.
          </p>
          <div className="cta-row" style={{ marginTop: 28 }}>
            <Link href="/#pre-order" className="btn">
              Go to pre-order
            </Link>
            <Link href="/#oven" className="btn btn-ghost">
              See the daily schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="menu-loaves" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="group-title">
            <h2 id="menu-loaves" style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>
              Loaves
            </h2>
            <p>Naturally leavened, baked on stone</p>
          </div>
          <BakeList category="loaf" />
        </div>
      </section>

      <section className="section" aria-labelledby="menu-pastries" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="group-title">
            <h2 id="menu-pastries" style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>
              Pastries
            </h2>
            <p>Laminated and baked by hand</p>
          </div>
          <BakeList category="pastry" />
        </div>
      </section>

      <section className="section" aria-labelledby="menu-cafe">
        <div className="wrap menu-split">
          <div>
            <div className="group-title">
              <h2 id="menu-cafe" style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>
                From the cafe counter
              </h2>
              <p>Made to order, not pre-orderable</p>
            </div>
            <ul className="cafe-menu">
              {CAFE_MENU.map((i) => (
                <li key={i.name}>
                  <span className="nm">
                    {i.name}
                    <span className="sub">{i.sub}</span>
                  </span>
                  <span className="price">{i.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ alignSelf: "start", display: "grid", gap: 20 }}>
            <div className="note-box" style={{ marginTop: 0 }}>
              <h3>Baking in order</h3>
              <p>
                Loaves come out from 6:30 am, laminated pastry from 7:00 am and the last bake lands at noon. Pick
                a pickup time that comes after your bakes.
              </p>
              <Link href="/#oven" style={{ fontWeight: 700 }}>
                Open the oven schedule
              </Link>
            </div>
            <div className="note-box" style={{ marginTop: 0 }}>
              <h3>Allergens</h3>
              <p>
                Our kitchen handles gluten, dairy, eggs, tree nuts, sesame and rye. We can&rsquo;t guarantee any
                item is free of them. Ask at the counter if you need help choosing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-clay" aria-labelledby="menu-cta">
        <div className="wrap cta-band">
          <h2 id="menu-cta" className="h2">
            Pick your bakes, <em>we&rsquo;ll hold them.</em>
          </h2>
          <p className="lede">Pre-orders close {CAFE.preorderCutoff}. Pay at the counter when you collect.</p>
          <Link href="/#pre-order" className="btn btn-gold">
            Pre-order for pickup
          </Link>
        </div>
      </section>
    </>
  );
}
