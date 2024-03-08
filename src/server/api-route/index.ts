import { match } from 'ts-pattern';

import { FailureCode, type Failure } from '../activitypub/domain/failures';
import { logger } from '../logger';

import type { APIRoute as AstroAPIRoute } from 'astro';
import type { ResultAsync } from 'neverthrow';
import type { Logger } from 'pino';

type APIRouteWithLogger = (
  context: Parameters<AstroAPIRoute>[0],
  logger: Logger<never>,
) => ResultAsync<Response, Failure>;

export const APIRoute = (
  name: string,
  route: APIRouteWithLogger,
): AstroAPIRoute => {
  return (context) => {
    const childLogger = logger.child({ endpoint: name });
    return route(context, childLogger).match(
      (response) => response,
      (failure) => {
        return match(failure)
          .with({ code: FailureCode.NotFound }, () => {
            return new Response(
              failure.message
                ? JSON.stringify({
                    error: failure.message,
                  })
                : null,
              {
                status: 404,
                statusText: 'Not found',
              },
            );
          })
          .with({ code: FailureCode.InvalidRequest }, () => {
            return new Response(
              failure.message
                ? JSON.stringify({
                    error: failure.message,
                  })
                : null,
              {
                status: 400,
                statusText: 'Bad request',
              },
            );
          })
          .otherwise(() => {
            childLogger.error(failure.underlyingError, 'Internal server error');
            return new Response(null, {
              status: 500,
              statusText: 'Internal server error',
            });
          });
      },
    );
  };
};
