import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { unknownFailure, type Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';

import type { AuthService } from '../../service/AuthService';
import type { SessionRepository } from '../repositories/SessionRepository';
import type { UserRepository } from '../repositories/UserRepository';
import type { Session } from '../vo/Session';

const Command = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, { message: 'usernameMustMoreThan3' })
    .max(20, { message: 'usernameMustLessThan20' }),
  password: z
    .string()
    .min(8, { message: 'passwordMustMoreThan8' })
    .max(100, { message: 'passwordMustLessThan100' }),
});

export const RegisterUseCase = usecase<
  z.infer<typeof Command>,
  ResultAsync<Session, Failure>,
  {
    authService: AuthService;
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
  }
>(({ userRepository, sessionRepository, authService }, command) =>
  zodParseResult(Command, command)
    .asyncAndThen(({ password, username, email }) =>
      authService
        .hashPassword(password)
        .map((hashedPassword) => ({
          id: authService.createUserID(),
          username,
          email,
          hashedPassword,
        }))
        .mapErr(() => unknownFailure()),
    )
    .andThen(({ username, hashedPassword, id, email }) =>
      userRepository.create({
        id,
        email,
        username,
        hashedPassword,
      }),
    )
    .andThen((user) => sessionRepository.create(user.id)),
);

export type RegisterUseCase = UseCaseOf<typeof RegisterUseCase>;
