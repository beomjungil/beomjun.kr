import type { TokenService } from '@/server/auth/service/TokenService';
import { Scope } from '@/server/auth/types/Scope';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { Result, err, ok, type ResultAsync } from 'neverthrow';
import { z } from 'zod';
import type { Application } from '../../entitites/Application';
import type { ApplicationRepository } from '../../repositories/ApplicationRepository';

const Command = z.object({
  scope: z.string(),
  clientId: z.string(),
  redirectUri: z.string(),
  clientSecret: z.string(),
});

type Command = z.infer<typeof Command>;

export const ExchangeClientCredential = usecase<
  Command,
  ResultAsync<
    {
      accessToken: string;
    },
    Failure
  >,
  {
    repository: ApplicationRepository;
    tokenService: TokenService;
  }
>(({ repository, tokenService }, command) => {
  return zodParseResult(Command, command)
    .asyncAndThen((validCommand) =>
      repository
        .getById(validCommand.clientId)
        .map((application) => ({ application, validCommand })),
    )
    .andThen(({ application, validCommand }) =>
      verifyApplication(application, validCommand),
    )
    .andThen(({ application, validCommand }) =>
      tokenService
        .createAccessToken({
          userId: application.id,
          scope: validCommand.scope,
        })
        .map((accessToken) => ({ accessToken }))
        .mapErr(failure),
    );
});

function verifyApplication(
  application: Application,
  command: Command,
): Result<{ application: Application; validCommand: Command }, Failure> {
  if (application.secret !== command.clientSecret) {
    return err(
      failure({
        code: FailureCode.Unauthorized,
        message: 'Unauthorized',
      }),
    );
  }

  if (!application.redirectUris.includes(command.redirectUri)) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'Invalid redirect uri',
      }),
    );
  }

  if (
    !command.scope
      .split(' ')
      .map((scope) => Scope.parse(scope))
      .every((scope) => application.scopes.includes(scope))
  ) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'Invalid scope',
      }),
    );
  }

  return ok({ application, validCommand: command });
}

export type ExchangeClientCredential = UseCaseOf<
  typeof ExchangeClientCredential
>;
