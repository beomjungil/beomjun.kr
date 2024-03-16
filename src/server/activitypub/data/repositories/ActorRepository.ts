import { ResultAsync } from 'neverthrow';

import {
  Actor,
  type ActorType,
} from '@/server/activitypub/domain/entities/Actor';
import { type Failure } from '@/server/failures';

import type { ActorRepository } from '@/server/activitypub/domain/repositories/ActorRepository';
import type { Database } from '@/server/database/drizzle';
import { singleRowOrFailure } from '@/server/database/singleRowOrFailure';
import { actors } from '@/server/database/tables/actors';
import { users } from '@/server/database/tables/users';
import { errorToFailure } from '@/server/utils/errorToFailure';
import { repository } from '@/server/utils/repository';
import { and, eq } from 'drizzle-orm/expressions';

export const ActorRepositoryImpl = repository<
  ActorRepository,
  {
    database: Database;
  }
>(({ database }) => ({
  findByUsername(
    username: string,
    domain: string,
  ): ResultAsync<Actor, Failure> {
    return ResultAsync.fromPromise(
      database
        .select({
          id: users.id,
          summary: users.summary,
          profileImageUrl: users.profileImageUrl,
          headerImageUrl: users.headerImageUrl,
          fullName: users.fullName,
          type: actors.type,
          publicKey: actors.publicKey,
          createdAt: actors.createdAt,
          updatedAt: actors.updatedAt,
        })
        .from(actors)
        .innerJoin(users, eq(users.id, actors.userId))
        .where(and(eq(users.username, username), eq(actors.domain, domain))),
      errorToFailure,
    )
      .andThen(singleRowOrFailure)
      .map((result) => {
        return Actor.parse({
          id: result.id,
          type: result.type as ActorType,
          username: username,
          domain: domain,
          name: result.fullName || undefined,
          summary: result.summary || undefined,
          iconUrl: result.profileImageUrl || undefined,
          headerImageUrl: result.headerImageUrl || undefined,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
          publicKey: result.publicKey,
        });
      });
  },
}));
