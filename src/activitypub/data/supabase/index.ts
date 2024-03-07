import {
  createClient,
  type PostgrestSingleResponse,
} from '@supabase/supabase-js';
import { ResultAsync } from 'neverthrow';

import { FailureCode, type Failure } from '@/activitypub/domain/failures';

import type { Database } from './types';

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

type Callback<T> = (
  base: typeof supabase,
) => PromiseLike<PostgrestSingleResponse<T>>;
type Converter<T, V> = (data: T) => V;

export const Supabase = {
  query: <T, V>(
    callback: Callback<T>,
    {
      converter,
    }: {
      converter: Converter<T, V>;
    },
  ): ResultAsync<V, Failure> => {
    return ResultAsync.fromPromise(
      callback(supabase).then(({ data, error }) => {
        if (error || !data) {
          throw error;
        }
        return converter(data as T);
      }),
      (error) => {
        const isKnownError = (
          e: unknown,
        ): e is { details: string; message: string } =>
          !!e && typeof e === 'object' && 'details' in e && 'message' in e;

        if (isKnownError(error)) {
          return {
            code: FailureCode.Database,
            message: error.message,
            underlyingError: new Error(error.details),
          };
        }
        return {
          code: FailureCode.Unknown,
          message: 'Unknown error occurred',
        };
      },
    );
  },
};
