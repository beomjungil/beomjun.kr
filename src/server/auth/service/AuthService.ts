import { service } from '@/server/utils/service';
import { Scrypt, generateId } from 'lucia';
import { ResultAsync, err, ok } from 'neverthrow';
import type { LuciaInstance } from '../dependencies/lucia';
import { Cookie } from '../domain/vo/Cookie';
import type { Session } from '../domain/vo/Session';

export interface AuthService {
  createUserID: () => string;

  hashPassword: (password: string) => ResultAsync<string, void>;

  verifyPassword: (
    hashedPassword: string,
    password: string,
  ) => ResultAsync<void, void>;

  sessionToCookie: (session?: Session) => Cookie;
}

export const AuthServiceImpl = service<
  AuthService,
  {
    lucia: LuciaInstance;
  }
>(({ lucia }) => ({
  createUserID: () => {
    return generateId(15);
  },

  hashPassword: (password) => {
    return ResultAsync.fromSafePromise(new Scrypt().hash(password));
  },

  verifyPassword: (hashedPassword, password) => {
    return ResultAsync.fromSafePromise(
      new Scrypt().verify(hashedPassword, password),
    ).andThen((isCorrect) => (isCorrect ? ok(undefined) : err(undefined)));
  },

  sessionToCookie: (session) => {
    return Cookie.parse(
      session
        ? lucia.createSessionCookie(session.id)
        : lucia.createBlankSessionCookie(),
    );
  },
}));
