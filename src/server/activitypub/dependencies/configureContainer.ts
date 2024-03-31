import { extendContainer } from '@/server/dependencies/configureContainer';
import { asFunction } from 'awilix';
import { ActorRepositoryImpl } from '../data/repositories/ActorRepository';
import { ApplicationRepositoryImpl } from '../data/repositories/ApplicationRepository';
import type { ActorRepository } from '../domain/repositories/ActorRepository';
import type { ApplicationRepository } from '../domain/repositories/ApplicationRepository';
import {
  ApplicationServiceImpl,
  type ApplicationService,
} from '../domain/service/ApplicationService';
import { CreateApplicationUseCase } from '../domain/usecase/CreateApplication';
import { GetActorByUsernameUseCase } from '../domain/usecase/GetActorByUsername';

export interface ActivityPubContainer {
  actorRepository: ActorRepository;

  applicationRepository: ApplicationRepository;

  applicationService: ApplicationService;

  getActorByUsernameUseCase: GetActorByUsernameUseCase;

  createApplicationUseCase: CreateApplicationUseCase;
}

export const configureActivityPubContainer =
  extendContainer<ActivityPubContainer>((container) => {
    return container
      .register({
        actorRepository: asFunction(() =>
          ActorRepositoryImpl({
            database: container.cradle.database,
          }),
        ).singleton(),

        applicationRepository: asFunction(() =>
          ApplicationRepositoryImpl({
            database: container.cradle.database,
          }),
        ).singleton(),
      })
      .register({
        applicationService: asFunction(ApplicationServiceImpl).singleton(),
      })
      .register({
        getActorByUsernameUseCase: asFunction(() =>
          GetActorByUsernameUseCase({
            repository: container.cradle.actorRepository,
          }),
        ).singleton(),

        createApplicationUseCase: asFunction(() =>
          CreateApplicationUseCase({
            repository: container.cradle.applicationRepository,
            service: container.cradle.applicationService,
          }),
        ).singleton(),
      });
  });
