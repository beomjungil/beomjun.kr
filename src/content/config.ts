import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/now' }),
  schema: z.object({
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, now };
