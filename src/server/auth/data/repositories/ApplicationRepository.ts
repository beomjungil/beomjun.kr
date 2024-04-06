import type { Database } from '@/server/database/drizzle';
import { singleRowOrFailure } from '@/server/database/singleRowOrFailure';
import { applications } from '@/server/database/tables/applications';
import { errorToFailure } from '@/server/utils/errorToFailure';
import { repository } from '@/server/utils/repository';
import { eq } from 'drizzle-orm';
import { ResultAsync } from 'neverthrow';
import { Application } from '../../domain/entitites/Application';
import type { ApplicationRepository } from '../../domain/repositories/ApplicationRepository';
import { Scope } from '../../types/Scope';

export const ApplicationRepositoryImpl = repository<
  ApplicationRepository,
  {
    database: Database;
  }
>(({ database }) => ({
  create(request) {
    return ResultAsync.fromPromise(
      database
        .insert(applications)
        .values({
          id: request.id,
          secret: request.secret,
          name: request.name,
          redirectUris: request.redirectUris.join(' '),
          website: request.website,
          createdAt: request.createdAt,
          scopes: request.scopes.join(' '),
        })
        .run()
        .then(() =>
          Application.parse({
            id: request.id,
            secret: request.secret,
            name: request.name,
            redirectUris: request.redirectUris,
            website: request.website,
            createdAt: request.createdAt,
            scopes: request.scopes,
          }),
        ),
      errorToFailure,
    );
  },

  getByName(name) {
    return ResultAsync.fromPromise(
      database
        .select({
          id: applications.id,
          secret: applications.secret,
          name: applications.name,
          redirectUris: applications.redirectUris,
          website: applications.website,
          createdAt: applications.createdAt,
          scopes: applications.scopes,
        })
        .from(applications)
        .where(eq(applications.name, name)),
      errorToFailure,
    )
      .andThen(singleRowOrFailure)
      .map((result) =>
        Application.parse({
          id: result.id,
          secret: result.secret,
          name: result.name,
          redirectUris: result.redirectUris.split(' '),
          website: result.website,
          createdAt: result.createdAt,
          scopes: result.scopes.split(' ').map((scope) => Scope.parse(scope)),
        }),
      );
  },

  getById(id) {
    return ResultAsync.fromPromise(
      database
        .select({
          id: applications.id,
          secret: applications.secret,
          name: applications.name,
          redirectUris: applications.redirectUris,
          website: applications.website,
          createdAt: applications.createdAt,
          scopes: applications.scopes,
        })
        .from(applications)
        .where(eq(applications.id, id)),
      errorToFailure,
    )
      .andThen(singleRowOrFailure)
      .map((result) =>
        Application.parse({
          id: result.id,
          secret: result.secret,
          name: result.name,
          redirectUris: result.redirectUris.split(' '),
          website: result.website,
          createdAt: result.createdAt,
          scopes: result.scopes.split(' ').map((scope) => Scope.parse(scope)),
        }),
      );
  },
}));
