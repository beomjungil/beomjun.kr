import type { Failure } from '@/server/failures';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { zodParseResult } from '@/server/utils/ZResult';
import { err, ok, type ResultAsync } from 'neverthrow';
import { z } from 'zod';
import type { ApplicationService } from '../../../service/ApplicationService';
import { Scope } from '../../../types/Scope';
import type { Application } from '../../entitites/Application';
import type { ApplicationRepository } from '../../repositories/ApplicationRepository';

const Command = z.object({
  name: z.string(),
  redirectUris: z.array(z.string()),
  website: z.string(),
  scopes: z.array(z.string()),
});

type Command = z.infer<typeof Command>;

export const CreateApplicationUseCase = usecase<
  Command,
  ResultAsync<Application, Failure>,
  {
    repository: ApplicationRepository;
    service: ApplicationService;
  }
>(({ repository, service }, command) => {
  return zodParseResult(Command, command).asyncAndThen((validCommand) =>
    returnIfExist(validCommand, repository).orElse((it) =>
      createRequest(it, service).asyncAndThen((request) =>
        repository.create(request),
      ),
    ),
  );
});

function returnIfExist(command: Command, repository: ApplicationRepository) {
  return repository.getByName(command.name).orElse(() => err(command));
}

function createRequest(command: Command, service: ApplicationService) {
  return ok(command).map(({ name, redirectUris, website, scopes }) => ({
    id: service.createApplicationID(),
    secret: service.createApplicationSecret(),
    name,
    redirectUris,
    website,
    createdAt: new Date(),
    scopes: scopes.map((scope) => Scope.parse(scope)),
  }));
}

export type CreateApplicationUseCase = UseCaseOf<
  typeof CreateApplicationUseCase
>;
