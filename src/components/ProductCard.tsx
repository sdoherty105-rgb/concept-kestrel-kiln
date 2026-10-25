import { BAKE_SLOTS, cents, type Product } from "@/lib/bakery";
import { AddToOrder } from "./AddToOrder";
import { ProductArt } from "./ProductArt";

export function ProductCard({ p }: { p: Product }) {
  return (
    <li className={`card reveal ${p.category}`} data-testid="product-card">
      <div className="card-art">
        <ProductArt kind={p.art} />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{p.name}</h3>
          <span className="price">{cents(p.price)}</span>
        </div>
        <p>{p.blurb}</p>
        <div className="card-foot">
          <span className="out-at">Out at {BAKE_SLOTS[p.slot].label}</span>
          <AddToOrder id={p.id} name={p.name} compact />
        </div>
      </div>
    </li>
  );
}
