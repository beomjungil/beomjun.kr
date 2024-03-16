import type { Failure } from '@/server/failures';
import type { ResultAsync } from 'neverthrow';
import type { Session } from '../vo/Session';

export interface SessionRepository {
  create: (userId: string) => ResultAsync<Session, Failure>;

  remove: (sessionId: Session['id']) => ResultAsync<void, Failure>;
}
