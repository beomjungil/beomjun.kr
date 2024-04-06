import { AuthRoute } from '@/server/auth/route';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { parseRequestBody } from '@/server/route/parseRequestBody';
import { json } from '@/server/route/response';
import { Result, err, errAsync, ok } from 'neverthrow';

export const prerender = false;

export const POST = AuthRoute(
  '/oauth/code',
  ({ request, locals }, container) => {
    const getApplication = container.resolve('getApplicationUseCase');
    const createAuthorizationCodeUseCase = container.resolve(
      'createAuthorizationCodeUseCase',
    );
    const userId = locals.user?.id;

    if (!userId) {
      return errAsync(
        failure({
          code: FailureCode.Unauthorized,
          message: 'Unauthorized',
        }),
      );
    }

    return parseRequestBody(request, validateBody)
      .andThen(({ clientId, redirectUri, scope, state }) =>
        getApplication({ clientId, redirectUri, scope }).map(() => ({
          userId,
          clientId,
          redirectUri,
          scope,
          state,
        })),
      )
      .andThen((command) =>
        createAuthorizationCodeUseCase(command).map((code) =>
          json({
            url: `${command.redirectUri}?code=${code}&state=${command.state}`,
          }),
        ),
      );
  },
);

interface RequestBody {
  clientId: string;
  redirectUri: string;
  state?: string;
  scope: string;
}

function validateBody(
  data: Record<string, unknown>,
): Result<RequestBody, Failure> {
  const clientId = data.client_id || data.clientId;
  const redirectUri = data.redirect_uri || data.redirectUri;
  const state = data.state;
  const scope = data.scope;

  if (typeof clientId !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'client_id is required',
      }),
    );
  }

  if (typeof redirectUri !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'redirect_uri is required',
      }),
    );
  }

  if (typeof scope !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'scope is required',
      }),
    );
  }

  if (state && typeof state !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'state must be a string',
      }),
    );
  }

  return ok({
    clientId,
    redirectUri,
    state: state as string | undefined,
    scope,
  });
}
