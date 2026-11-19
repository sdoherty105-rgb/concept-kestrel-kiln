import type { Metadata } from "next";
import Link from "next/link";
import { AddToOrder } from "@/components/AddToOrder";
import { BAKE_SLOTS, CAFE, PRODUCTS, cents } from "@/lib/bakery";

export const metadata: Metadata = {
  title: "Price list",
  description:
    "Demonstration price list for Kestrel & Kiln, a fictional Perth bakery. Every loaf and pastry, with the time it comes out of the oven. A concept by OFF/SHIFT Studio.",
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

function PriceRows({ category }: { category: "loaf" | "pastry" }) {
  return (
    <ul className="price-list">
      {PRODUCTS.filter((p) => p.category === category).map((p) => (
        <li className="price-row" key={p.id} data-testid="menu-item">
          <span className="price-name">{p.name}</span>
          <span className="price-meta nums">Out {BAKE_SLOTS[p.slot].label}</span>
          <span className="price-figure nums">{cents(p.price)}</span>
          <AddToOrder id={p.id} name={p.name} compact />
        </li>
      ))}
    </ul>
  );
}

export default function MenuPage() {
  return (
    <article className="menu-sheet">
      <div className="menu-head">
        <p className="label">Printable list</p>
        <h1 id="menu-title" className="plate-name">
          Price list
        </h1>
        <p className="plate-sentence">
          Demonstration prices. Bakery items can be added to a pre-order. Cafe items are made when you visit,
          and are not held.
        </p>
        <p className="visit-links">
          <Link href="/#pre-order">Go to the order</Link>
          <Link href="/#oven">Bake clock</Link>
        </p>
      </div>

      <section aria-labelledby="menu-loaves">
        <h2 id="menu-loaves" className="label">
          Loaves
        </h2>
        <PriceRows category="loaf" />
      </section>

      <section aria-labelledby="menu-pastries">
        <h2 id="menu-pastries" className="label">
          Pastry
        </h2>
        <PriceRows category="pastry" />
      </section>

      <section aria-labelledby="menu-cafe">
        <h2 id="menu-cafe" className="label">
          Cafe counter
        </h2>
        <p className="plate-sentence">Made to order. Not on the ledger.</p>
        <ul className="price-list">
          {CAFE_MENU.map((item) => (
            <li className="price-row" key={item.name}>
              <span className="price-name">
                {item.name}
                <span className="price-sub">{item.sub}</span>
              </span>
                  <span className="price-figure nums">{item.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="menu-notes" className="menu-notes">
        <h2 id="menu-notes" className="label">
          Notes
        </h2>
        <p>
          Loaves come out from {BAKE_SLOTS[0].label}. Laminated pastry follows at {BAKE_SLOTS[1].label}. The last
          bake is {BAKE_SLOTS[6].label}. Choose a pickup at or after the bake.
        </p>
        <p>
          The kitchen handles gluten, dairy, eggs, tree nuts, sesame and rye. Nothing can be guaranteed free of
          them.
        </p>
        <p>
          Pre-orders close {CAFE.preorderCutoff}. This list is a demonstration. Nothing on it is for sale.
        </p>
      </section>
    </article>
  );
}
