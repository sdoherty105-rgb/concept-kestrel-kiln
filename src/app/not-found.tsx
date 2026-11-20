import Link from "next/link";

export default function NotFound() {
  return (
    <section className="visit-plate" aria-labelledby="nf-title">
      <p className="label">Page not found</p>
      <h1 id="nf-title" className="plate-name">
        Nothing in this oven.
      </h1>
      <p className="plate-sentence">That page was never on the bake list.</p>
      <p className="visit-links">
        <Link href="/">Back to the counter</Link>
        <Link href="/menu">Price list</Link>
      </p>
    </section>
  );
}
