import { ResultAsync, err, ok, type Result } from 'neverthrow';

import { AuthRoute } from '@/server/auth/route';
import { FailureCode, failure, type Failure } from '@/server/failures';

export const prerender = false;

export const POST = AuthRoute(
  '/auth/register',
  ({ request, redirect, cookies }, container) => {
    const register = container.resolve('registerUseCase');
    const setSession = container.resolve('setSessionUseCase');

    return ResultAsync.fromSafePromise(request.formData())
      .andThen(getFormData)
      .andThen(register)
      .map((session) => setSession({ session, cookies }))
      .map(() => redirect('/login?registered=true'));
  },
);

function getFormData(
  formData: FormData,
): Result<{ email: string; password: string; username: string }, Failure> {
  const email = formData.get('email')?.toString();
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (!email) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'emailIsRequired',
      }),
    );
  }

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

  return ok({ email, password, username });
}
