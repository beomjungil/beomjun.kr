import { service } from '@/server/utils/service';
import { SignJWT, jwtVerify } from 'jose';
import { ResultAsync } from 'neverthrow';
import type { AuthorizationCodeToken } from '../types/AuthorizationCodeToken';

export interface AuthorizationCodeService {
  create: (payload: AuthorizationCodeToken) => ResultAsync<string, undefined>;
  verify: (token: string) => ResultAsync<AuthorizationCodeToken, undefined>;
}

export const AuthorizationCodeServiceImpl = service<
  AuthorizationCodeService,
  {
    secret: string;
  }
>(({ secret }) => ({
  create(payload: {
    userId: string;
    clientId: string;
    redirectUri: string;
    scope: string;
  }) {
    const builder = new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1m')
      .setIssuer('https://beomjun.kr');

    return ResultAsync.fromPromise(
      builder.sign(new TextEncoder().encode(secret)),
      () => undefined,
    );
  },

  verify(token: string) {
    return ResultAsync.fromPromise(
      jwtVerify<AuthorizationCodeToken>(
        token,
        new TextEncoder().encode(secret),
      ).then(({ payload }) => payload),
      () => undefined,
    );
  },
}));
