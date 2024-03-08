import { ResultAsync, err, ok, type Result } from 'neverthrow';

import {
  FailureCode,
  type Failure,
} from '@/server/activitypub/domain/failures';
import { APIRoute } from '@/server/api-route';
import { register } from '@/server/auth/dependencies';

export const prerender = false;

export const POST = APIRoute('/auth/register', ({ request, redirect }) => {
  return ResultAsync.fromSafePromise(request.formData())
    .andThen(getFormData)
    .andThen(register)
    .map(() => redirect('/login?registered=true'));
});

function getFormData(
  formData: FormData,
): Result<{ email: string; password: string }, Failure> {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return err({
      code: FailureCode.InvalidRequest,
      message: 'Email and password are required',
    });
  }

  return ok({ email, password });
}
