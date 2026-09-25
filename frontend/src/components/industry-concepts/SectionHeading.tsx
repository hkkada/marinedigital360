/**
 * The site's centred section heading — gradient-filled emphasis word between
 * two hairline rules. Lifted verbatim from the treatment in `Experience.tsx`
 * so every concept below is judged in the real page voice, not a new one.
 *
 * Server component: no hooks, no motion.
 */
export interface SectionHeadingProps {
  /** Plain leading words, e.g. "Industries We". */
  lead: string;
  /** The gradient-filled word(s), e.g. "Serve". */
  accent: string;
  /** Supporting line under the heading. */
  sub: string;
  /** Heading id, so the wrapping <section> can point `aria-labelledby` at it. */
  id?: string;
}

export function SectionHeading({ lead, accent, sub, id }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        <div className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-transparent to-[#1877F2]" />
        <h2
          id={id}
          className="text-h2 text-gray-900 max-sm:whitespace-normal sm:whitespace-nowrap"
        >
          {lead}{' '}
          <span className="bg-gradient-to-r from-[#1877F2] via-[#42A5F5] to-[#1877F2] bg-clip-text text-transparent">
            {accent}
          </span>
        </h2>
        <div className="h-px w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-[#1877F2] to-transparent" />
      </div>
      <p className="max-w-[54ch] text-lead text-gray-600 font-light">
        {sub}
      </p>
    </div>
  );
}

/** The one supporting line every concept shares, so they compare like for like. */
export const INDUSTRIES_SUBHEAD =
  'Fifteen markets, one playbook: find the demand that already exists, then meet it where it searches.';
