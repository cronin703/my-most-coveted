import { z } from "zod";

/**
 * Content schemas. Every image needs real alt text, every entry says whether it is
 * placeholder content. These shapes are what a future CMS must return.
 */

export const imageSchema = z.object({
  src: z.string().startsWith("/", "Image src must be a site-relative path"),
  alt: z
    .string()
    .trim()
    .min(1, "Alt text is required")
    .refine((alt) => !/^todo\b/i.test(alt), "Alt text must describe the image, not say TODO"),
});

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  positioning: z.string().min(1),
  primaryCta: linkSchema,
  nav: z.array(linkSchema).min(1),
  contact: z.object({
    email: z.email(),
    serviceArea: z.string().min(1),
    responseTime: z.string().min(1),
  }),
  social: z.object({
    instagram: z.url(),
  }),
  placeholder: z.boolean(),
  todo: z.array(z.string()).optional(),
});

export const serviceModes = ["in-person", "remote", "hybrid"] as const;

export const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  tagline: z.string().min(1),
  order: z.number().int().positive(),
  mode: z.enum(serviceModes),
  whoFor: z.string().min(1),
  includes: z.array(z.string().min(1)).min(1),
  turnaround: z.string().min(1),
  format: z.string().min(1),
  priceFrom: z.number().positive().nullable(),
  faqs: z.array(faqSchema),
  heroImage: imageSchema,
  looks: z.number().int().positive().optional(),
  placeholder: z.boolean(),
});

export const lookCategories = ["Everyday", "Event", "Closet Edits", "Remote"] as const;

export const lookSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(lookCategories),
  summary: z.string().min(1),
  cover: imageSchema,
  gallery: z.array(imageSchema),
  formula: z.array(z.string().min(1)),
  relatedService: z.string().min(1),
  placeholder: z.boolean(),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  context: z.string().min(1),
  placeholder: z.boolean(),
});

export type Image = z.infer<typeof imageSchema>;
export type Site = z.infer<typeof siteSchema>;
export type ServiceMode = (typeof serviceModes)[number];
export type LookCategory = (typeof lookCategories)[number];

/** MDX entries carry their body source alongside the validated front matter. */
export type Service = z.infer<typeof serviceSchema> & { body: string };
export type Look = z.infer<typeof lookSchema> & { body: string };
export type Testimonial = z.infer<typeof testimonialSchema>;
