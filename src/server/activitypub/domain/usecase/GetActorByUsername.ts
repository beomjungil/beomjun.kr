import { err, ok, Result, type ResultAsync } from 'neverthrow';

import { FailureCode, type Failure } from '../failures';

import { usecase } from '@/server/activitypub/utils/usecase';

import type { RequiredDeep } from 'type-fest';
import type { Actor } from '../entities/Actor';
import type { ActorRepository } from '../repositories/ActorRepository';

interface Command {
  username?: string;
  domain?: string;
}

export const GetActorByUsernameUseCase = usecase<
  Command,
  ResultAsync<Actor, Failure>,
  {
    repository: ActorRepository;
  }
>(({ repository }, command) =>
  ok(command)
    .andThen(validateCommand)
    .asyncAndThen(({ username, domain }) =>
      repository.findByUsername(username, domain),
    ),
);

function validateCommand({
  username,
  domain,
}: Command): Result<RequiredDeep<Command>, Failure> {
  if (!username || !domain) {
    return err({
      code: FailureCode.InvalidRequest,
      message: 'Invalid request',
    });
  }

  if (domain !== 'beomjun.kr') {
    return err({
      code: FailureCode.NotFound,
      message: 'This actor might not exist in this domain.',
    });
  }

  return ok({
    username,
    domain,
  });
}
