import { Result, ResultAsync, err, ok } from 'neverthrow';

import { AuthRoute } from '@/server/auth/route';
import { FailureCode, failure, type Failure } from '@/server/failures';

export const prerender = false;

export const POST = AuthRoute(
  '/auth/login',
  ({ request, cookies, redirect }, container) => {
    const loginWithPassword = container.resolve('loginWithPasswordUseCase');
    const setSession = container.resolve('setSessionUseCase');

    return ResultAsync.fromSafePromise(request.formData())
      .andThen(getFormData)
      .andThen(loginWithPassword)
      .map((session) => setSession({ session, cookies }))
      .map(() => redirect('/me'));
  },
);

function getFormData(
  formData: FormData,
): Result<{ password: string; username: string }, Failure> {
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (!password) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'passwordIsRequired',
      }),
    );
  }

  if (!username) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'usernameIsRequired',
      }),
    );
  }

  return ok({ password, username });
}
