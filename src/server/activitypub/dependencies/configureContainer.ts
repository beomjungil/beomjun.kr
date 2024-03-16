import { extendContainer } from '@/server/dependencies/configureContainer';
import { asFunction } from 'awilix';
import { ActorRepositoryImpl } from '../data/repositories/ActorRepository';
import type { ActorRepository } from '../domain/repositories/ActorRepository';
import { GetActorByUsernameUseCase } from '../domain/usecase/GetActorByUsername';

export interface AcitivityPubContainer {
  actorRepository: ActorRepository;

  getActorByUsernameUseCase: GetActorByUsernameUseCase;
}

export const configureActivityPubContainer =
  extendContainer<AcitivityPubContainer>((container) => {
    return container
      .register({
        actorRepository: asFunction(() =>
          ActorRepositoryImpl({
            database: container.cradle.database,
          }),
        ).singleton(),
      })
      .register({
        getActorByUsernameUseCase: asFunction(() =>
          GetActorByUsernameUseCase({
            repository: container.cradle.actorRepository,
          }),
        ).singleton(),
      });
  });
