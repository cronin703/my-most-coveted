import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  lookSchema,
  serviceSchema,
  siteSchema,
  testimonialSchema,
  type Look,
  type Service,
  type Site,
  type Testimonial,
} from "./schema";

/**
 * The only module that reads /content. Pages call these functions and never import
 * content files directly, so swapping to a CMS later means rewriting this file only.
 * Content is read at build time; invalid content fails the build with a clear message.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

function fail(file: string, error: z.ZodError): never {
  throw new Error(`Invalid content in content/${file}:\n${z.prettifyError(error)}`);
}

function readJson<T>(file: string, schema: z.ZodType<T>): T {
  const raw: unknown = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
  const result = schema.safeParse(raw);
  if (!result.success) fail(file, result.error);
  return result.data;
}

function readMdxDir<T extends { slug: string }>(
  dir: string,
  schema: z.ZodType<T>,
): (T & { body: string })[] {
  const folder = path.join(CONTENT_DIR, dir);
  return fs
    .readdirSync(folder)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const file = `${dir}/${name}`;
      const { data, content } = matter(fs.readFileSync(path.join(folder, name), "utf8"));
      const result = schema.safeParse(data);
      if (!result.success) fail(file, result.error);
      if (result.data.slug !== name.replace(/\.mdx$/, "")) {
        throw new Error(`content/${file}: slug "${result.data.slug}" must match the file name`);
      }
      return { ...result.data, body: content.trim() };
    });
}

let cache: {
  site: Site;
  services: Service[];
  looks: Look[];
  testimonials: Testimonial[];
} | null = null;

function load() {
  if (cache) return cache;

  const site = readJson("site.json", siteSchema);
  const services = readMdxDir("services", serviceSchema).sort((a, b) => a.order - b.order);
  const looks = readMdxDir("looks", lookSchema).sort((a, b) => a.title.localeCompare(b.title));
  const testimonials = readJson("testimonials.json", z.array(testimonialSchema));

  const serviceSlugs = new Set(services.map((s) => s.slug));
  for (const look of looks) {
    if (!serviceSlugs.has(look.relatedService)) {
      throw new Error(
        `content/looks/${look.slug}.mdx: relatedService "${look.relatedService}" is not a service slug`,
      );
    }
  }
  const orders = services.map((s) => s.order);
  if (new Set(orders).size !== orders.length) {
    throw new Error("content/services: two services share the same order number");
  }

  cache = { site, services, looks, testimonials };
  return cache;
}

export function getSite(): Site {
  return load().site;
}

export function getServices(): Service[] {
  return load().services;
}

export function getService(slug: string): Service | undefined {
  return load().services.find((s) => s.slug === slug);
}

export function getLooks(): Look[] {
  return load().looks;
}

export function getLook(slug: string): Look | undefined {
  return load().looks.find((l) => l.slug === slug);
}

export function getTestimonials(): Testimonial[] {
  return load().testimonials;
}

/** Display helpers shared by every page. */
export function formatPrice(priceFrom: number | null): string {
  if (priceFrom === null) return "From $—";
  return `$${priceFrom.toLocaleString("en-US")}`;
}

export function serviceNumber(order: number): string {
  return String(order).padStart(2, "0");
}
