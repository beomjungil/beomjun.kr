import { defineCollection, z } from 'astro:content';

export const tagsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
  }),
});
