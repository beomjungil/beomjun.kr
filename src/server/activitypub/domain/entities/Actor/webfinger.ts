import { z } from 'zod';

export const WebfingerSchema = z.object({
  subject: z.string(),
  aliases: z.array(z.string()),
  links: z.array(
    z.union([
      z.object({
        rel: z.string(),
        type: z.string(),
        href: z.string(),
      }),
      z.object({
        rel: z.string(),
        template: z.string(),
      }),
    ]),
  ),
});

export type WebfingerSchema = z.infer<typeof WebfingerSchema>;
