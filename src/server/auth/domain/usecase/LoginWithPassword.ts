import { err, ok, ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { failure, FailureCode, type Failure } from '@/server/failures';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import { zodParseResult } from '@/server/utils/ZResult';

import type { AuthService } from '../../service/AuthService';
import type { User } from '../entitites/User';
import type { SessionRepository } from '../repositories/SessionRepository';
import type { UserRepository } from '../repositories/UserRepository';
import type { Session } from '../vo/Session';

const Command = z.object({
  username: z
    .string()
    .min(3, { message: 'usernameMustMoreThan3' })
    .max(20, { message: 'usernameMustLessThan20' }),
  password: z
    .string()
    .min(8, { message: 'passwordMustMoreThan8' })
    .max(100, { message: 'passwordMustLessThan100' }),
});

export const LoginWithPasswordUseCase = usecase<
  z.infer<typeof Command>,
  ResultAsync<Session, Failure>,
  {
    authService: AuthService;
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
  }
>(({ userRepository, sessionRepository, authService }, command) =>
  zodParseResult(Command, command)
    .asyncAndThen(({ username, password }) =>
      userRepository
        .findByUsername(username)
        .mapErr(
          () =>
            ({
              code: FailureCode.InvalidRequest,
              message: 'invalidUsernameOrPassword',
            }) satisfies Failure,
        )
        .map((user) => ({ user, password })),
    )
    .andThen(({ user, password }) => {
      if (!user.hashedPassword) {
        return err(
          failure({
            code: FailureCode.InvalidRequest,
            message: 'thirdPartyLoginInsteadOfPassword',
          }),
        );
      }

      return ok({ user: user as User & { hashedPassword: string }, password });
    })
    .andThen(({ user, password }) => {
      return authService
        .verifyPassword(user.hashedPassword, password)
        .map(() => user)
        .mapErr(() =>
          failure({
            code: FailureCode.InvalidRequest,
            message: 'invalidUsernameOrPassword',
          }),
        );
    })
    .andThen((user) => sessionRepository.create(user.id)),
);

export type LoginWithPasswordUseCase = UseCaseOf<
  typeof LoginWithPasswordUseCase
>;
