import type { Failure } from '@/server/failures';
import type { ResultAsync } from 'neverthrow';
import type { User } from '../entitites/User';

export interface UserRepository {
  create: (payload: {
    id: string;
    email: string;
    username: string;
    hashedPassword: string;
  }) => ResultAsync<User, Failure>;

  findByUsername: (username: string) => ResultAsync<User, Failure>;
}
