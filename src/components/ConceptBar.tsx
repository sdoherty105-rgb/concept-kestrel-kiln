import { SITE } from "@/lib/bakery";

export function ConceptBar() {
  return (
    <div className="concept-bar" data-testid="concept-label">
      <a href={SITE.conceptUrl} target="_blank" rel="noopener">
        {SITE.conceptLabel}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
