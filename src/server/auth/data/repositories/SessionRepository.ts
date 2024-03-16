import type { SessionRepository } from '@/server/auth/domain/repositories/SessionRepository';
import { errorToFailure } from '@/server/utils/errorToFailure';
import { repository } from '@/server/utils/repository';
import { ResultAsync, ok } from 'neverthrow';
import type { LuciaInstance } from '../../dependencies/lucia';
import { Session } from '../../domain/vo/Session';

export const SessionRepositoryImpl = repository<
  SessionRepository,
  {
    lucia: LuciaInstance;
  }
>(({ lucia }) => ({
  create: (userId) => {
    return ResultAsync.fromPromise(
      lucia.createSession(userId, {}),
      errorToFailure,
    ).andThen((response) => {
      return ok(
        Session.parse({
          id: response.id,
          expiresAt: response.expiresAt,
          fresh: response.fresh,
          userId: response.userId,
        }),
      );
    });
  },

  remove: (sessionId) => {
    return ResultAsync.fromPromise(
      lucia.invalidateSession(sessionId),
      errorToFailure,
    );
  },
}));
