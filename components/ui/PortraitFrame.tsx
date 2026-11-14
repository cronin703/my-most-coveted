/**
 * Labelled empty frame. Used where a real photo of her belongs; we never stand in a
 * stock portrait for "her". TODO(client): portrait photos.
 */
export function PortraitFrame({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} (photo coming soon)`}
      className={`flex aspect-[4/5] items-end border border-line bg-[#ece6dd] p-6 ${className}`}
    >
      <span className="label text-stone">{label} · photo to come</span>
    </div>
  );
}
