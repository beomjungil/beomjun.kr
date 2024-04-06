import type { Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase } from '@/server/utils/usecase';
import type { ResultAsync } from 'neverthrow';
import { z } from 'zod';
import type { User } from '../entitites/User';
import type { UserRepository } from '../repositories/UserRepository';

const Command = z.object({
  id: z.string(),
});

type Command = z.infer<typeof Command>;

export const GetUserByID = usecase<
  Command,
  ResultAsync<User, Failure>,
  {
    repository: UserRepository;
  }
>(({ repository }, command) => {
  return zodParseResult(Command, command).asyncAndThen(({ id }) =>
    repository.getByID(id),
  );
});

export type GetUserByID = ReturnType<typeof GetUserByID>;
