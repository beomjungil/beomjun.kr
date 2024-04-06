import { service } from '@/server/utils/service';
import { SignJWT, jwtVerify } from 'jose';
import { ResultAsync } from 'neverthrow';
import { Scope } from '../types/Scope';

export interface TokenService {
  createAccessToken(payload: {
    userId: string;
    scope: string;
    audience?: string;
  }): ResultAsync<string, undefined>;
  createRefreshToken(userId: string): ResultAsync<string, undefined>;

  verifyAccessToken(
    token: string,
  ): ResultAsync<{ userId: string; scopes: Scope[] }, undefined>;
  verifyRefreshToken(token: string): ResultAsync<{ userId: string }, undefined>;
}

export const TokenServiceImpl = service<
  TokenService,
  {
    accessTokenSecret: string;
    refreshTokenSecret: string;
  }
>(({ accessTokenSecret, refreshTokenSecret }) => ({
  createAccessToken({ userId, scope, audience }) {
    const builder = new SignJWT({
      sub: userId,
      scope,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .setIssuer('https://beomjun.kr');

    if (audience) {
      builder.setAudience(audience);
    }

    return ResultAsync.fromPromise<string, undefined>(
      builder.sign(new TextEncoder().encode(accessTokenSecret)),
      () => undefined,
    );
  },
  createRefreshToken(userId: string) {
    const builder = new SignJWT({
      sub: userId,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .setIssuer('https://beomjun.kr');

    return ResultAsync.fromPromise(
      builder.sign(new TextEncoder().encode(refreshTokenSecret)),
      () => undefined,
    );
  },
  verifyAccessToken(token: string) {
    return ResultAsync.fromPromise(
      jwtVerify<{
        sub: string;
        scope: string;
      }>(token, new TextEncoder().encode(accessTokenSecret), {
        issuer: 'https://beomjun.kr',
      }).then(({ payload }) => ({
        userId: payload.sub,
        scopes: payload.scope.split(' ').map((scope) => Scope.parse(scope)),
      })),
      () => undefined,
    );
  },
  verifyRefreshToken(token: string) {
    return ResultAsync.fromPromise(
      jwtVerify<{ sub: string }>(
        token,
        new TextEncoder().encode(refreshTokenSecret),
        {
          issuer: 'https://beomjun.kr',
        },
      ).then(({ payload }) => ({
        userId: payload.sub,
      })),
      () => undefined,
    );
  },
}));
