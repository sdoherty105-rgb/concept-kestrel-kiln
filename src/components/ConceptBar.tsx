import { SITE } from "@/lib/bakery";

/** Studio strip on every page: what this is, the way back, and the enquiry link. */
export function ConceptBar() {
  return (
    <div className="concept-bar" data-testid="concept-label">
      <p className="concept-note">
        <span className="concept-disclosure">{SITE.disclosure}</span>
        <span className="concept-inline-cta">
          <span aria-hidden="true"> · </span>
          <a href={SITE.enquiryUrl} className="concept-cta" data-testid="concept-cta">
            Want a site like this?
          </a>
        </span>
      </p>
      <p className="concept-links">
        <a href={SITE.conceptUrl} data-testid="concept-return">
          Back to the concept
        </a>
        <a href={SITE.enquiryUrl} className="concept-cta concept-cta-wide" data-testid="concept-cta-wide">
          Want a website like this?
        </a>
      </p>
    </div>
  );
}