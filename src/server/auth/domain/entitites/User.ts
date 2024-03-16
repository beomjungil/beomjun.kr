import { z } from 'zod';

import { ZSchema } from '@/server/utils/ZSchema';

export const UserData = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  hashedPassword: z.string().optional(),
});

export class User extends ZSchema(UserData) {}
