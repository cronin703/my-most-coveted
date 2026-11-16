import { wordmarkPaths, wordmarkViewBox } from "@/lib/wordmark";

/**
 * Inline wordmark that draws its outline, then fills (used by the opening sequence).
 * Server-rendered filled, so it reads correctly with JS off or motion reduced.
 */
export function WordmarkDraw({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg
      data-wordmark-draw=""
      viewBox={wordmarkViewBox}
      role="img"
      aria-label={label}
      className={className}
    >
      <g data-fill="" fill="currentColor">
        {wordmarkPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g
        data-stroke=""
        fill="none"
        stroke="currentColor"
        strokeWidth={36}
        opacity={0}
        aria-hidden="true"
      >
        {wordmarkPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
