import { type ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { type Failure } from '@/server/activitypub/domain/failures';
import { usecase } from '@/server/activitypub/utils/usecase';
import { zodParseResult } from '@/server/activitypub/utils/ZResult';

import type { AstroCookies } from 'astro';
import type { AuthRepository } from '../repositories/AuthRepository';

const Command = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginWithPasswordUseCase = usecase<
  z.infer<typeof Command> & {
    cookies: AstroCookies;
  },
  ResultAsync<void, Failure>,
  {
    repository: AuthRepository;
  }
>(({ repository }, { cookies, ...command }) =>
  zodParseResult(Command, command)
    .asyncAndThen(({ email, password }) =>
      repository.loginWithPassword(email, password),
    )
    .map(({ accessToken, refreshToken }) => {
      cookies.set('access-token', accessToken, {
        path: '/',
      });
      cookies.set('refresh-token', refreshToken, {
        path: '/',
      });

      return undefined;
    }),
);
