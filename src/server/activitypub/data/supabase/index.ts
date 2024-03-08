import {
  createClient,
  type PostgrestSingleResponse,
} from '@supabase/supabase-js';
import { ResultAsync } from 'neverthrow';

import {
  FailureCode,
  type Failure,
} from '@/server/activitypub/domain/failures';

import type { Database } from './types';

export const supabase = createClient<Database>(
  'https://vfkedhgiubyogeetugob.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZma2VkaGdpdWJ5b2dlZXR1Z29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NzU1NjYsImV4cCI6MjAwNzE1MTU2Nn0.hJSgpC7UpE7IF9Jhpyn4ipulnrGU5CX72ABRQbnzjwo',
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
  auth: supabase.auth,
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
