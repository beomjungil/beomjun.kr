import { ResultAsync } from 'neverthrow';

import type { Database } from '@/server/database/drizzle';
import { singleRowOrFailure } from '@/server/database/singleRowOrFailure';
import { users } from '@/server/database/tables/users';
import { errorToFailure } from '@/server/utils/errorToFailure';
import { repository } from '@/server/utils/repository';
import { eq } from 'drizzle-orm/expressions';
import { generateId } from 'lucia';
import { User } from '../../domain/entitites/User';
import type { UserRepository } from '../../domain/repositories/UserRepository';

export const UserRepositoryImpl = repository<
  UserRepository,
  {
    database: Database;
  }
>(({ database }) => ({
  createUserID: () => generateId(15),

  create: ({ id, email, hashedPassword, username }) => {
    return ResultAsync.fromPromise(
      database
        .insert(users)
        .values({
          id,
          email,
          username,
          hashedPassword,
        })
        .returning({
          id: users.id,
          email: users.email,
          username: users.username,
          hashedPassword: users.hashedPassword,
        }),
      errorToFailure,
    )
      .andThen(singleRowOrFailure)
      .map((response) =>
        User.parse({
          id: response.id,
          email: response.email ?? undefined,
          username: response.username,
          hashedPassword: response.hashedPassword ?? undefined,
        }),
      );
  },

  findByUsername: (username) => {
    return ResultAsync.fromPromise(
      database.select().from(users).where(eq(users.username, username)),
      errorToFailure,
    )
      .andThen(singleRowOrFailure)
      .map((response) =>
        User.parse({
          id: response.id,
          email: response.email ?? undefined,
          username: response.username,
          hashedPassword: response.hashedPassword ?? undefined,
        }),
      );
  },
}));
