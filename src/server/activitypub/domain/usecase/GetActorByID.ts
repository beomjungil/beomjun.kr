import { ok, type ResultAsync } from 'neverthrow';

import { usecase } from '@/server/activitypub/utils/usecase';

import type { Actor } from '../entities/Actor';
import type { Failure } from '../failures';
import type { ActorRepository } from '../repositories/ActorRepository';

interface Command {
  id: string;
}

export const GetActorByIDUseCase = usecase<
  Command,
  ResultAsync<Actor, Failure>,
  {
    repository: ActorRepository;
  }
>(({ repository }, command) =>
  ok(command).asyncAndThen(({ id }) => repository.findByID(id)),
);
