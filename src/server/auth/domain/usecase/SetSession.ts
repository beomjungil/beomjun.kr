import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import type { AstroCookies } from 'astro';
import type { AuthService } from '../../service/AuthService';
import type { Session } from '../vo/Session';

export const SetSessionUseCase = usecase<
  { session?: Session; cookies: AstroCookies },
  void,
  {
    authService: AuthService;
  }
>(({ authService }, { session, cookies }) => {
  const cookie = authService.sessionToCookie(session);

  cookies.set(cookie.name, cookie.value, cookie.attributes);
});

export type SetSessionUseCase = UseCaseOf<typeof SetSessionUseCase>;
