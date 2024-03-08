import { okAsync, type ResultAsync } from 'neverthrow';

import { type Failure } from '@/server/activitypub/domain/failures';
import { usecase } from '@/server/activitypub/utils/usecase';

import type { AstroCookies } from 'astro';

export const LogoutUseCase = usecase<
  {
    cookies: AstroCookies;
  },
  ResultAsync<void, Failure>
>((_, { cookies }) => {
  cookies.delete('access-token', { path: '/' });
  cookies.delete('refresh-token', { path: '/' });
  return okAsync(undefined);
});
