/**
 * Lists every content entry still flagged `placeholder: true`, plus TODO(client) notes.
 *
 *   pnpm check:placeholders        list them (always exits 0)
 *   node scripts/check-placeholders.ts --ci
 *                                  used by `pnpm build`: exits 1 when VERCEL_ENV=production
 *                                  and any placeholder remains, so prod can't ship them.
 *
 * Self-contained on purpose (Node runs it directly with type stripping, no build step).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ci = process.argv.includes("--ci");
const isProduction = process.env.VERCEL_ENV === "production";

type Finding = { file: string; label: string };

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const placeholders: Finding[] = [];
const todos: Finding[] = [];

for (const full of walk(CONTENT_DIR)) {
  const file = path.relative(process.cwd(), full);
  const raw = fs.readFileSync(full, "utf8");

  if (full.endsWith(".mdx")) {
    const { data } = matter(raw);
    if (data.placeholder === true) {
      placeholders.push({ file, label: String(data.title ?? data.slug ?? file) });
    }
  } else if (full.endsWith(".json")) {
    const json: unknown = JSON.parse(raw);
    const entries = Array.isArray(json) ? json : [json];
    entries.forEach((entry: Record<string, unknown>, i) => {
      if (entry?.placeholder === true) {
        const name = entry.name ?? entry.title ?? `entry ${i + 1}`;
        const label = Array.isArray(json) ? `${String(name)} (#${i + 1})` : String(name);
        placeholders.push({ file, label });
      }
    });
  }

  raw.split("\n").forEach((line, i) => {
    const match = line.match(/TODO\(client\):?\s*(.*)$/);
    if (!match) return;
    const detail = match[1]?.replace(/["\],]+$/, "").trim();
    // `turnaround: "TODO(client)"` has no detail: name the field that needs an answer.
    const field = line.match(/^\s*([\w-]+):/)?.[1];
    todos.push({ file: `${file}:${i + 1}`, label: detail || (field ? `${field} needed` : "") });
  });
}

if (placeholders.length === 0) {
  console.log("✓ No placeholder content left.");
} else {
  console.log(`${placeholders.length} placeholder entr${placeholders.length === 1 ? "y" : "ies"}:`);
  for (const p of placeholders) console.log(`  • ${p.label}  (${p.file})`);
}

if (todos.length > 0) {
  console.log(`\n${todos.length} TODO(client) note${todos.length === 1 ? "" : "s"}:`);
  for (const t of todos) console.log(`  • ${t.label || "(no detail)"}  (${t.file})`);
}

if (ci && isProduction && placeholders.length > 0) {
  console.error("\n✗ Production build blocked: replace or unflag the placeholder content above.");
  process.exit(1);
}
