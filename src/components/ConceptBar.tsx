import { SITE } from "@/lib/bakery";

/** Studio strip on every page: what this is, the way back, and the enquiry link. */
export function ConceptBar() {
  return (
    <div className="concept-bar" data-testid="concept-label">
      <p className="concept-note">{SITE.disclosure}</p>
      <p className="concept-links">
        <a href={SITE.conceptUrl} data-testid="concept-return">
          Back to the concept
        </a>
        <a href={SITE.enquiryUrl} className="concept-cta" data-testid="concept-cta">
          Want a website like this?
        </a>
      </p>
    </div>
  );
}
