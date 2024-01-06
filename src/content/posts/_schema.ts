import { defineCollection, reference, z } from 'astro:content';

export const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    locale: z.string(),
    tags: z.array(reference('tags')),
  }),
});
