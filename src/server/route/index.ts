import { match } from 'ts-pattern';

import { FailureCode, type Failure } from '../failures';

import type { APIContext, APIRoute as AstroAPIRoute } from 'astro';
import type { AwilixContainer } from 'awilix';
import type { ResultAsync } from 'neverthrow';
import {
  configureCoreContainer,
  identical,
  type DependencyContainer,
  type ExtendContainer,
  type ExtendedContainer,
} from '../dependencies/configureContainer';

export type APIRouteFunction<T> = (
  context: APIContext,
  container: ExtendedContainer<T>,
) => ResultAsync<Response, Failure>;

export const APIRoute = <T = never>(
  name: string,
  route: APIRouteFunction<T>,
  extendContainer: ExtendContainer<T> = identical,
): AstroAPIRoute => {
  return (context) => {
    const container = extendContainer(
      configureCoreContainer({
        DB: context.locals.runtime.env.DB,
        name,
      }),
    );

    return route(context, container).match(
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
            (container as AwilixContainer<DependencyContainer>)
              .resolve('logger')
              .error(failure.underlyingError, 'Internal server error');
            return new Response(null, {
              status: 500,
              statusText: 'Internal server error',
            });
          });
      },
    );
  };
};
