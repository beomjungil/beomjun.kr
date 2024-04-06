import type { AuthorizationCodeService } from '@/server/auth/service/AuthorizationCodeService';
import type { TokenService } from '@/server/auth/service/TokenService';
import type { AuthorizationCodeToken } from '@/server/auth/types/AuthorizationCodeToken';
import { Scope } from '@/server/auth/types/Scope';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { ResultAsync, err, ok } from 'neverthrow';
import { z } from 'zod';
import type { Application } from '../../entitites/Application';
import type { ApplicationRepository } from '../../repositories/ApplicationRepository';

const Command = z.object({
  token: z.string(),
  scopes: z.array(Scope),
  clientId: z.string(),
  redirectUri: z.string(),
  clientSecret: z.string(),
});

type Command = z.infer<typeof Command>;

export const ExchangeAuthorizationCode = usecase<
  Command,
  ResultAsync<
    {
      accessToken: string;
      refreshToken: string;
    },
    Failure
  >,
  {
    authorizationCodeService: AuthorizationCodeService;
    tokenService: TokenService;
    applicationRepository: ApplicationRepository;
  }
>(
  (
    { tokenService, authorizationCodeService, applicationRepository },
    command,
  ) => {
    return zodParseResult(Command, command)
      .asyncAndThen((validCommand) =>
        authorizationCodeService
          .verify(validCommand.token)
          .map((token) => ({ validCommand, token }) as const)
          .mapErr(failure),
      )
      .andThen(({ validCommand, token }) => verifyToken(validCommand, token))
      .andThen(({ token, ...rest }) =>
        applicationRepository.getById(token.clientId).map((application) => ({
          application,
          token,
          ...rest,
        })),
      )
      .andThen(({ application, token, command: validCommand }) =>
        verifyApplication(application, validCommand, token),
      )
      .andThen(({ userId, scope }) =>
        ResultAsync.combine([
          tokenService.createAccessToken({ userId, scope }),
          tokenService.createRefreshToken(userId),
        ])
          .map(([accessToken, refreshToken]) => ({
            accessToken,
            refreshToken,
          }))
          .mapErr(failure),
      );
  },
);

function verifyToken(command: Command, token: AuthorizationCodeToken) {
  if (token.clientId !== command.clientId) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'clientIdDoesNotMatch',
      }),
    );
  }

  if (token.redirectUri !== command.redirectUri) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'redirectUriDoesNotMatch',
      }),
    );
  }

  if (command.scopes.some((scope) => !token.scope.includes(scope))) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'scopeDoesNotMatch',
      }),
    );
  }

  return ok({ token, command });
}

function verifyApplication(
  application: Application,
  command: Command,
  token: AuthorizationCodeToken,
) {
  if (application.secret !== command.clientSecret) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'clientSecretDoesNotMatch',
      }),
    );
  }

  if (
    !command.scopes.every((scope) =>
      application.scopes.includes(Scope.parse(scope)),
    )
  ) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'scopeDoesNotMatch',
      }),
    );
  }

  if (!application.redirectUris.includes(command.redirectUri)) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'redirectUriDoesNotMatch',
      }),
    );
  }

  return ok(token);
}

export type ExchangeAuthorizationCode = UseCaseOf<
  typeof ExchangeAuthorizationCode
>;
