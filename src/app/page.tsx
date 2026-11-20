import { BakeSchedule } from "@/components/BakeSchedule";
import { CafeHours } from "@/components/CafeHours";
import { Plate } from "@/components/Plate";
import { PreOrder } from "@/components/PreOrder";
import { CAFE, PLATES } from "@/lib/bakery";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/bakes/country-sourdough-800.avif"
        imageSrcSet="/bakes/country-sourdough-800.avif 800w, /bakes/country-sourdough-1200.avif 1200w"
        imageSizes="(max-width: 899px) 100vw, 46vw"
        fetchPriority="high"
      />
      {PLATES.map((product, index) => (
        <Plate key={product.id} product={product} index={index} />
      ))}
      <BakeSchedule />
      <PreOrder />
      <section id="visit" className="visit-plate" data-layout="visit" aria-labelledby="visit-title">
        <p className="label">Visit</p>
        <h2 id="visit-title" className="plate-name">
          Millstone Lane
        </h2>
        <p className="label">Demonstration address and hours</p>
        <address className="visit-lines">
          <span>{CAFE.address[0]}</span>
          <span>{CAFE.address[1]}</span>
        </address>
        <CafeHours />
        <p className="visit-note">Step-free from the lane. Dogs on the terrace.</p>
        <p className="visit-links">
          <a href={`tel:${CAFE.phoneHref}`}>{CAFE.phone}</a>
          <Link href="/menu">Price list</Link>
        </p>
      </section>
    </>
  );
}
