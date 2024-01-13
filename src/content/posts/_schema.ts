import { defineCollection, z } from 'astro:content';

export const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    locale: z.string(),
    tags: z.array(z.string()),
  }),
});
