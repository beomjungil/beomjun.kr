import { ActorRepositoryImpl } from '../data/repositories/ActorRepository';
import { GetActorByIDUseCase } from '../domain/usecase/GetActorByID';
import { GetActorByUsernameUseCase } from '../domain/usecase/GetActorByUsername';

import type { ActorRepository } from '../domain/repositories/ActorRepository';

class RepositoryContainer {
  static shared = new RepositoryContainer();
  private constructor(
    public readonly actorRepository: ActorRepository = ActorRepositoryImpl,
  ) {}
}

export const getActorByID = GetActorByIDUseCase({
  repository: RepositoryContainer.shared.actorRepository,
});

export const getActorByUsername = GetActorByUsernameUseCase({
  repository: RepositoryContainer.shared.actorRepository,
});
