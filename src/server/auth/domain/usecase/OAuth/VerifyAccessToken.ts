import type { Scope } from '@/server/auth/types/Scope';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { zodParseResult } from '@/server/utils/ZResult';
import { usecase, type UseCaseOf } from '@/server/utils/usecase';
import type { ResultAsync } from 'neverthrow';
import { z } from 'zod';
import type { TokenService } from '../../../service/TokenService';

const Command = z.object({
  token: z.string(),
});

type Command = z.infer<typeof Command>;

export const VerifyAccessToken = usecase<
  Command,
  ResultAsync<{ userId: string; scopes: Scope[] }, Failure>,
  {
    service: TokenService;
  }
>(({ service }, command) => {
  return zodParseResult(Command, command)
    .asyncAndThen(({ token }) =>
      service.verifyAccessToken(token).mapErr(() =>
        failure({
          code: FailureCode.Unauthorized,
          message: 'Unauthorized',
        }),
      ),
    )
    .map(({ userId, scopes }) => ({ userId, scopes }));
});

export type VerifyAccessToken = UseCaseOf<typeof VerifyAccessToken>;
