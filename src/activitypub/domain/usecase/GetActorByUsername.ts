import { ok, type ResultAsync } from 'neverthrow';

import { usecase } from '@/activitypub/utils/usecase';

import type { ActorSchema } from '../entities/Actor/schema';
import type { Failure } from '../failures';
import type { ActorRepository } from '../repositories/ActorRepository';

interface Command {
  username: string;
  domain: string;
}

export const GetActorByUsernameUseCase = usecase<
  Command,
  // TODO: 서버 응답으로 쓸 수 있는 Failure로 변환 필요
  ResultAsync<ActorSchema, Failure>,
  {
    repository: ActorRepository;
  }
>(({ repository }, command) =>
  ok(command)
    .asyncAndThen(({ username, domain }) =>
      repository.findByUsername(username, domain),
    )
    .andThen((actor) => ok(actor.toSchema())),
);
