"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Look, LookCategory } from "@/lib/schema";
import { TransitionLink } from "@/components/motion/PageTransition";
import { LookCard } from "./LookCard";

type Filter = LookCategory | "All";

/**
 * Lookbook grid with category filters. Server-rendered with every look visible, so it
 * works without JavaScript; the filter buttons narrow it in place and keep the choice
 * in the URL (?category=Event) so a filtered view can be shared. A polite live region
 * announces the result count. An empty category gets a useful next step, not a blank.
 */
export function LookbookGrid({
  looks,
  categories,
  initial = "All",
}: {
  looks: Look[];
  categories: readonly LookCategory[];
  initial?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initial);

  const choose = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>([["All", looks.length]]);
    for (const c of categories) map.set(c, looks.filter((l) => l.category === c).length);
    return map;
  }, [looks, categories]);

  const visible = filter === "All" ? looks : looks.filter((l) => l.category === filter);
  const options: Filter[] = ["All", ...categories];

  return (
    <>
      <div
        role="group"
        aria-label="Filter looks by category"
        className="frame flex flex-wrap gap-x-2 gap-y-2 pb-10"
      >
        {options.map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => choose(option)}
              className={`label inline-flex min-h-11 items-center gap-2 border px-4 transition-colors duration-[var(--dur-hover)] ${
                active ? "border-ink bg-ink text-ivory" : "border-line text-ink hover:border-ink"
              }`}
            >
              {option}
              <span className={active ? "text-ivory/80" : "text-stone"}>
                {counts.get(option) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="sr-only">Looks</h2>
      <p aria-live="polite" className="sr-only">
        {`Showing ${visible.length} ${visible.length === 1 ? "look" : "looks"}${filter === "All" ? "" : ` in ${filter}`}`}
      </p>

      {visible.length > 0 ? (
        <div className="frame grid gap-x-[var(--gutter)] gap-y-16 pb-[var(--section-l)] sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((look, i) => (
            <div key={look.slug} className={`lookbook-cell ${i % 3 === 1 ? "lg:mt-24" : ""}`}>
              <LookCard look={look} eager={i < 2} />
            </div>
          ))}
        </div>
      ) : (
        <div className="frame pb-[var(--section-l)]">
          <div className="border-y border-line py-16 md:py-24">
            <p className="label text-stone">{filter}</p>
            <p className="display-s mt-4 max-w-[24ch] font-display font-light">
              No {filter.toLowerCase()} stories here yet.
            </p>
            <p className="measure mt-4 text-stone">
              {filter === "Remote"
                ? "Remote clients get a complete, shoppable season of looks wherever they live. See how the Digital Lookbook works, or browse every story in the meantime."
                : "New stories are added as they happen. Browse every look in the meantime."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {filter === "Remote" ? (
                <TransitionLink
                  href="/services/digital-lookbook"
                  className="label inline-flex min-h-11 items-center bg-ink px-6 text-ivory"
                >
                  See the Digital Lookbook
                </TransitionLink>
              ) : null}
              <button
                type="button"
                onClick={() => choose("All")}
                className="label link-draw inline-flex min-h-11 items-center"
              >
                Show all looks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Reads ?category= from the URL. Rendered inside <Suspense> whose fallback is the
 * plain grid, so the static HTML always contains every look.
 */
export function LookbookGridFromUrl(props: { looks: Look[]; categories: readonly LookCategory[] }) {
  const param = useSearchParams().get("category");
  const initial: Filter =
    param && (props.categories as readonly string[]).includes(param)
      ? (param as LookCategory)
      : "All";
  return <LookbookGrid key={initial} {...props} initial={initial} />;
}
