import type { AuthorizationCodeService } from '@/server/auth/service/AuthorizationCodeService';
import { failure, type Failure } from '@/server/failures';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { zodParseResult } from '@/server/utils/ZResult';
import type { ResultAsync } from 'neverthrow';
import { z } from 'zod';

const Command = z.object({
  userId: z.string(),
  clientId: z.string(),
  redirectUri: z.string(),
  scope: z.string(),
});

type Command = z.infer<typeof Command>;

export const CreateAuthorizationCode = usecase<
  Command,
  ResultAsync<string, Failure>,
  {
    service: AuthorizationCodeService;
  }
>(({ service }, command) => {
  return zodParseResult(Command, command).asyncAndThen((validCommand) =>
    service.create(validCommand).mapErr(() => failure()),
  );
});

export type CreateAuthorizationCode = UseCaseOf<typeof CreateAuthorizationCode>;
