import { z } from 'zod';

import { ZSchema } from '@/server/utils/ZSchema';

export const SessionData = z.object({
  id: z.string(),
  expiresAt: z.date(),
  fresh: z.boolean(),
  userId: z.string(),
});

export class Session extends ZSchema(SessionData) {}
