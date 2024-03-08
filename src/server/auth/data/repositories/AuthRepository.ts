import { ResultAsync, err, ok } from 'neverthrow';

import { Session } from '../../domain/vo/Session';

import { Supabase } from '@/server/activitypub/data/supabase';
import { FailureCode } from '@/server/activitypub/domain/failures';

import type { AuthRepository } from '../../domain/repositories/AuthRepository';

export const AuthRepositoryImpl: AuthRepository = {
  register: (email, password) => {
    return ResultAsync.fromSafePromise(
      Supabase.auth.signUp({
        email,
        password,
      }),
    ).andThen((response) => {
      if (response.error) {
        return err({
          code: FailureCode.AuthProvider,
          message: response.error.message,
          underlyingError: response.error,
        });
      }
      return ok(undefined);
    });
  },
  loginWithPassword(email, password) {
    return ResultAsync.fromSafePromise(
      Supabase.auth.signInWithPassword({
        email,
        password,
      }),
    ).andThen((response) => {
      if (response.error || !response.data.session) {
        return err({
          code: FailureCode.AuthProvider,
          message: response.error?.message ?? '',
          underlyingError: response.error,
        });
      }
      return ok(
        Session.parse({
          providerToken: response.data.session.provider_token,
          providerRefreshToken: response.data.session.provider_refresh_token,
          accessToken: response.data.session.access_token,
          refreshToken: response.data.session.refresh_token,
          expiresIn: response.data.session.expires_in,
          expiresAt: response.data.session.expires_at,
          tokenType: response.data.session.token_type,
          user: response.data.user,
        }),
      );
    });
  },
};
