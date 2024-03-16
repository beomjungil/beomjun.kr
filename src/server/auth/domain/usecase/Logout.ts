import { type ResultAsync } from 'neverthrow';

import { type Failure } from '@/server/failures';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';

import type { SessionRepository } from '../repositories/SessionRepository';

export const LogoutUseCase = usecase<
  { sessionId: string },
  ResultAsync<void, Failure>,
  {
    sessionRepository: SessionRepository;
  }
>(({ sessionRepository }, { sessionId }) => {
  return sessionRepository.remove(sessionId);
});

export type LogoutUseCase = UseCaseOf<typeof LogoutUseCase>;
