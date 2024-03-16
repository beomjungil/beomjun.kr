import { ZSchema } from '@/server/utils/ZSchema';
import { z } from 'zod';

const CookieData = z.object({
  name: z.string(),
  value: z.string(),
  attributes: z
    .object({
      domain: z.string().optional(),
      expires: z.date().optional(),
      httpOnly: z.boolean().optional(),
      maxAge: z.number().optional(),
      path: z.string().optional(),
      sameSite: z.enum(['lax', 'none', 'strict']).optional(),
      secure: z.boolean().optional(),
    })
    .optional(),
});

export class Cookie extends ZSchema(CookieData) {}
