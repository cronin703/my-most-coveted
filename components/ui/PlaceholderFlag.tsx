import { isProduction } from "@/lib/env";

/** Small "Sample" tag on placeholder content. Never rendered in production. */
export function PlaceholderFlag({ show, label = "Sample" }: { show: boolean; label?: string }) {
  if (!show || isProduction) return null;
  return (
    <span className="label inline-block border border-dashed border-stone px-2 py-0.5 text-stone">
      {label}
    </span>
  );
}
