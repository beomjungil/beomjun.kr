import { SESSION_COOKIE_NAME } from '@/server/auth/constants';
import { AuthRoute } from '@/server/auth/route';
import type { AstroCookies } from 'astro';
import { err, ok, okAsync, type Result } from 'neverthrow';

export const prerender = false;

function getSessionID(cookies: AstroCookies): Result<string, void> {
  const sessionCookie = cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    return err(undefined);
  }
  return ok(sessionCookie.value);
}

const EXECUTE = AuthRoute(
  '/auth/logout',
  ({ cookies, redirect }, container) => {
    const logout = container.resolve('logoutUseCase');
    const setSession = container.resolve('setSessionUseCase');

    return getSessionID(cookies)
      .match(
        (sessionId) => logout({ sessionId }),
        () => okAsync(undefined),
      )
      .map(() => setSession({ cookies }))
      .map(() => redirect('/login'));
  },
);

export const GET = EXECUTE;

export const POST = EXECUTE;
