import { z } from 'zod';

import { ZSchema } from '@/server/activitypub/utils/ZSchema';

export const UserData = z.object({
  id: z.string(),
  aud: z.string(),
  email: z.string().optional(),
});

export class User extends ZSchema(UserData) {}
