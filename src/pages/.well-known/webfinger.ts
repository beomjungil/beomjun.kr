import { ActivityPubRoute } from '@/server/activitypub/route';
import { FailureCode, type Failure } from '@/server/failures';
import { json } from '@/server/route/response';
import { Result, err, ok } from 'neverthrow';

export const prerender = false;

export const GET = ActivityPubRoute(
  '/.well-known/webfinger',
  ({ url }, container) => {
    const getActorByUsername = container.resolve('getActorByUsernameUseCase');
    return validateSearchParams(url.searchParams)
      .andThen(validateResource)
      .asyncAndThen(getActorByUsername)
      .map((actor) => actor.toWebfinger())
      .map(json);
  },
);

function validateSearchParams(
  params: URLSearchParams,
): Result<string, Failure> {
  const resource = params.get('resource');
  if (!resource) {
    return err({
      code: FailureCode.NotFound,
      message: 'Resource not found',
    });
  }
  return ok(resource);
}

function validateResource(resource: string): Result<
  {
    username: string;
    domain: string;
  },
  Failure
> {
  const account = resource.replaceAll('acct:', '');
  const [username, domain] = account.split('@');

  return !domain
    ? err({
        code: FailureCode.NotFound,
        message: 'Domain not found',
      })
    : ok({ username, domain });
}
