import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    category: reference('category'),
  }),
});

const category = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './content/categories' }),
  schema: z.object({
    title: z.object({
      ko: z.string(),
      en: z.string(),
      ja: z.string(),
    }),
    order: z.number(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/now' }),
  schema: z.object({
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, now, category };
