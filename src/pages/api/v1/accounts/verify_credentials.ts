import { AuthRoute } from '@/server/auth/route';
import { Scope } from '@/server/auth/types/Scope';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { AllCORS } from '@/server/route/AllCORS';
import { json } from '@/server/route/response';
import { Result, err, ok } from 'neverthrow';

export const prerender = false;

export const GET = AuthRoute(
  'api/v1/verify_credentials',
  ({ request }, container) => {
    const getUser = container.resolve('getUserByIDUseCase');
    const verifyAccessToken = container.resolve('verifyAccessTokenUseCase');

    return getToken(request)
      .asyncAndThen((token) => verifyAccessToken({ token }))
      .andThen(({ userId, scopes }) =>
        requireScope(scopes, Scope.enum.read).map(() => userId),
      )
      .andThen((userId) => getUser({ id: userId }))
      .map((user) => json(user.toMastodonAccount(), { allowCors: true }));
  },
);

function getToken(request: Request): Result<string, Failure> {
  const authorization = request.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return err(
      failure({
        code: FailureCode.Unauthorized,
        message: 'Unauthorized',
      }),
    );
  }

  return ok(authorization.slice(7));
}

function requireScope(
  scopes: Scope[],
  requiredScope: Scope,
): Result<void, Failure> {
  if (scopes.includes(requiredScope)) {
    return ok(undefined);
  }

  return err(
    failure({
      code: FailureCode.Unauthorized,
      message: 'Unauthorized',
    }),
  );
}

export const OPTIONS = AllCORS();
