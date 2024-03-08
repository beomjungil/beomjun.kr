import { z } from 'zod';

import { User, UserData } from '../entitites/User';

import { ZSchema } from '@/server/activitypub/utils/ZSchema';

export const SessionData = z.object({
  providerToken: z.string().optional().nullable(),
  providerRefreshToken: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  expiresAt: z.number().optional(),
  tokenType: z.string(),
  user: UserData,
});

export class Session extends ZSchema(SessionData) {
  getUser(): User {
    return User.parse(this.user);
  }
}
