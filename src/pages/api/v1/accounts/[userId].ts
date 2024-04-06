import { AuthRoute } from '@/server/auth/route';
import { FailureCode, failure } from '@/server/failures';
import { AllCORS } from '@/server/route/AllCORS';
import { json } from '@/server/route/response';
import { errAsync } from 'neverthrow';

export const prerender = false;

export const GET = AuthRoute(
  '/api/v1/accounts/:userId',
  ({ params }, container) => {
    const getUserByID = container.resolve('getUserByIDUseCase');

    if (!params.userId) {
      return errAsync(
        failure({
          code: FailureCode.NotFound,
          message: 'User not found',
        }),
      );
    }

    return getUserByID({ id: params.userId }).map((account) =>
      json(account.toMastodonAccount(), { allowCors: true }),
    );
  },
);

export const OPTIONS = AllCORS();
