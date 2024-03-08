import { type ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { type Failure } from '@/server/activitypub/domain/failures';
import { usecase } from '@/server/activitypub/utils/usecase';
import { zodParseResult } from '@/server/activitypub/utils/ZResult';

import type { AuthRepository } from '../repositories/AuthRepository';

const Command = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterUseCase = usecase<
  z.infer<typeof Command>,
  ResultAsync<void, Failure>,
  {
    repository: AuthRepository;
  }
>(({ repository }, command) =>
  zodParseResult(Command, command).asyncAndThen(({ email, password }) =>
    repository.register(email, password),
  ),
);
