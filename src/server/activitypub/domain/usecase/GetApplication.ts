import { FailureCode, failure, type Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { z } from 'astro:content';
import { err, ok, type Result, type ResultAsync } from 'neverthrow';
import type { Application } from '../entities/Application';
import type { ApplicationRepository } from '../repositories/ApplicationRepository';
import { Scope } from '../types/Scope';

const Command = z.object({
  clientId: z.string(),
  redirectUri: z.string(),
  scopes: z.array(z.string()),
});

type Command = z.infer<typeof Command>;

export const GetApplicationUseCase = usecase<
  z.infer<typeof Command>,
  ResultAsync<Application, Failure>,
  {
    repository: ApplicationRepository;
  }
>(({ repository }, command) => {
  return zodParseResult(Command, command)
    .asyncAndThen((validCommand) => repository.getById(validCommand.clientId))
    .andThen((application) => failureIfScopesDoesNotMatch(application, command))
    .andThen((application) =>
      failureIfRedirectUriDoesNotMatch(application, command),
    );
});

function failureIfScopesDoesNotMatch(
  application: Application,
  command: Command,
): Result<Application, Failure> {
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

  return ok(application);
}

function failureIfRedirectUriDoesNotMatch(
  application: Application,
  command: Command,
): Result<Application, Failure> {
  if (application.redirectUris.includes(command.redirectUri)) {
    return ok(application);
  }

  return err(
    failure({
      code: FailureCode.InvalidRequest,
      message: 'redirectUriDoesNotMatch',
    }),
  );
}

export type GetApplicationUseCase = UseCaseOf<typeof GetApplicationUseCase>;
