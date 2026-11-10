import { BAKE_SLOTS, cents, type Product } from "@/lib/bakery";
import { PlateStepper } from "./PlateStepper";

/** Different crop, scale and side so the sequence is not six copies of one frame. */
const FRAMES = [
  { side: "right", scale: "large", crop: "low" },
  { side: "right", scale: "small", crop: "high" },
  { side: "left", scale: "medium", crop: "center" },
  { side: "right", scale: "small", crop: "tight" },
  { side: "left", scale: "large", crop: "low" },
  { side: "right", scale: "medium", crop: "high" },
] as const;

const ALT: Record<string, string> = {
  "country-sourdough": "A round country sourdough boule with a blistered crust, on a seamless flour-coloured ground.",
  "butter-croissant": "A single butter croissant, laminated and golden, on a seamless flour-coloured ground.",
  "rye-caraway": "A dark oval rye loaf with a split crust, on a seamless flour-coloured ground.",
  "kouign-amann": "A square caramelised kouign-amann with laminated sides, on a seamless flour-coloured ground.",
  "spelt-batard": "An oval seeded spelt loaf, on a seamless flour-coloured ground.",
  focaccia: "A square rosemary and sea salt focaccia, on a seamless flour-coloured ground.",
};

export function Plate({ product, index }: { product: Product; index: number }) {
  const slot = BAKE_SLOTS[product.slot];
  const n = String(index + 1).padStart(2, "0");
  const first = index === 0;
  const frame = FRAMES[index] ?? FRAMES[0];
  const Title = first ? "h1" : "h2";
  const src = `/bakes/${product.id}`;

  return (
    <section
      className={first ? "plate plate-first" : "plate"}
      data-layout="plate"
      data-side={frame.side}
      data-scale={frame.scale}
      data-crop={frame.crop}
      id={first ? "bakes" : `plate-${product.id}`}
      aria-labelledby={`name-${product.id}`}
      data-testid="product-card"
    >
      <div className="plate-copy">
        {first && (
          <p className="plate-index" data-testid="plate-index">
            <span>Bakery &amp; cafe, Wattlebrook</span>
            <a href="#visit">Tue–Sun from 6:30 am</a>
            <a href="#pre-order">Order by 6 pm for tomorrow</a>
          </p>
        )}
        <p className="label">Plate {n}</p>
        <Title id={`name-${product.id}`} className="plate-name">
          {product.name}
        </Title>
        <p className="plate-sentence">{product.blurb}</p>
        <dl className="spec">
          <div>
            <dt>Flour</dt>
            <span className="leader" aria-hidden="true" />
            <dd>{product.spec.flour}</dd>
          </div>
          <div>
            <dt>Hydration</dt>
            <span className="leader" aria-hidden="true" />
            <dd className="nums">{product.spec.hydration}</dd>
          </div>
          <div>
            <dt>Ferment</dt>
            <span className="leader" aria-hidden="true" />
            <dd className="nums">{product.spec.ferment}</dd>
          </div>
          <div>
            <dt>Out of the oven</dt>
            <span className="leader" aria-hidden="true" />
            <dd className="nums">{slot.label}</dd>
          </div>
        </dl>
        <PlateStepper id={product.id} name={product.name} />
        <p className="label demo-line">
          Demonstration price <span className="nums">{cents(product.price)}</span>
        </p>
      </div>
      <figure className="plate-photo">
        <img
          src={`${src}-800.avif`}
          srcSet={`${src}-800.avif 800w, ${src}-1200.avif 1200w`}
          sizes="(max-width: 899px) 100vw, 46vw"
          alt={ALT[product.id] ?? product.name}
          width={800}
          height={1000}
          fetchPriority={first ? "high" : "low"}
          loading={first ? "eager" : "lazy"}
          decoding={first ? "sync" : "async"}
        />
      </figure>
    </section>
  );
}
