import { AuthRoute } from '@/server/auth/route';
import { Scope } from '@/server/auth/types/Scope';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { AllCORS } from '@/server/route/AllCORS';
import { parseRequestBody } from '@/server/route/parseRequestBody';
import { json } from '@/server/route/response';
import { Result, err, errAsync, ok } from 'neverthrow';
import { match } from 'ts-pattern';

export const prerender = false;

export const POST = AuthRoute('/oauth/token', ({ request }, container) => {
  const exchangeAuthorizationCodeUseCase = container.resolve(
    'exchangeAuthorizationCodeUseCase',
  );
  const exchangeClientCredentialUseCase = container.resolve(
    'exchangeClientCredentialUseCase',
  );

  return parseRequestBody(request, validateBody).andThen((command) => {
    return match(command)
      .with(
        { grantType: 'authorization_code' },
        ({ code, scope, redirectUri, clientId, clientSecret }) =>
          exchangeAuthorizationCodeUseCase({
            token: code,
            scopes: scope.split(' ').map((scope) => Scope.parse(scope)),
            clientId,
            redirectUri,
            clientSecret,
          }).map((result) =>
            json(
              {
                access_token: result.accessToken,
                refresh_token: result.refreshToken,
                token_type: 'Bearer',
                created_at: Date.now(),
                scope,
              },
              { allowCors: true },
            ),
          ),
      )
      .with(
        { grantType: 'client_credentials' },
        ({ scope, clientId, clientSecret, redirectUri }) =>
          exchangeClientCredentialUseCase({
            scope,
            clientId,
            redirectUri,
            clientSecret,
          }).map((result) =>
            json(
              {
                access_token: result.accessToken,
                token_type: 'Bearer',
                created_at: Date.now(),
                scope: command.scope,
              },
              { allowCors: true },
            ),
          ),
      )
      .otherwise(() => errAsync(failure()));
  });
});

export const OPTIONS = AllCORS();

interface BaseRequestBody<T> {
  clientId: string;
  clientSecret: string;
  scope: string;
  grantType: T;
}

interface AuthorizationCodeRequestBody
  extends BaseRequestBody<'authorization_code'> {
  code: string;
  redirectUri: string;
}

interface RefreshTokenRequestBody extends BaseRequestBody<'refresh_token'> {
  refreshToken: string;
}

interface ClientCredentialsRequestBody
  extends BaseRequestBody<'client_credentials'> {
  redirectUri: string;
}

type RequestBody =
  | AuthorizationCodeRequestBody
  | RefreshTokenRequestBody
  | ClientCredentialsRequestBody;

function validateBody(
  data: Record<string, unknown>,
): Result<RequestBody, Failure> {
  const clientId = data.client_id || data.clientId;
  const clientSecret = data.client_secret || data.clientSecret;
  const scope = data.scope;
  const grantType = data.grant_type || data.grantType;

  if (typeof clientId !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'client_id is required',
      }),
    );
  }

  if (typeof clientSecret !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'client_secret is required',
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

  if (typeof grantType !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'grant_type is required',
      }),
    );
  }

  switch (grantType) {
    case 'authorization_code': {
      const code = data.code;
      const redirectUri = data.redirect_uri;

      if (typeof code !== 'string') {
        return err(
          failure({
            code: FailureCode.InvalidRequest,
            message: 'code is required',
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

      return ok({
        clientId,
        clientSecret,
        scope,
        grantType,
        code,
        redirectUri,
      });
    }

    case 'refresh_token': {
      const refreshToken = data.refresh_token;

      if (typeof refreshToken !== 'string') {
        return err(
          failure({
            code: FailureCode.InvalidRequest,
            message: 'refresh_token is required',
          }),
        );
      }

      return ok({
        clientId,
        clientSecret,
        scope,
        grantType,
        refreshToken,
      });
    }

    case 'client_credentials': {
      const redirectUri = data.redirect_uri;

      if (typeof redirectUri !== 'string') {
        return err(
          failure({
            code: FailureCode.InvalidRequest,
            message: 'redirect_uri is required',
          }),
        );
      }

      return ok({
        clientId,
        clientSecret,
        scope,
        grantType,
        redirectUri,
      });
    }

    default:
      return err(
        failure({
          code: FailureCode.InvalidRequest,
          message: 'invalid grant_type',
        }),
      );
  }
}
