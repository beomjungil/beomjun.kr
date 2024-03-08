import type { Failure } from '@/server/activitypub/domain/failures';
import type { ResultAsync } from 'neverthrow';
import type { Session } from '../vo/Session';

export interface AuthRepository {
  register: (
    email: string,
    password: string,
  ) => ResultAsync<undefined, Failure>;
  loginWithPassword: (
    email: string,
    password: string,
  ) => ResultAsync<Session, Failure>;
}
