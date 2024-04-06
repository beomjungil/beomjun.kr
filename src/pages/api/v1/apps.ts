import { AuthRoute } from '@/server/auth/route';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { AllCORS } from '@/server/route/AllCORS';
import { parseRequestBody } from '@/server/route/parseRequestBody';
import { json } from '@/server/route/response';
import { err, ok, type Result } from 'neverthrow';

export const prerender = false;

export const POST = AuthRoute('/api/v1/apps', ({ request }, container) => {
  const createApplication = container.resolve('createApplicationUseCase');

  return parseRequestBody(request, validateBody)
    .andThen(({ clientName, redirectUris, scopes, website }) =>
      createApplication({
        name: clientName,
        redirectUris: redirectUris.split(' '),
        website,
        scopes: scopes.split(' '),
      }),
    )
    .map((application) => json(application.toContract(), { allowCors: true }))
    .orElse((failure) =>
      ok(new Response(JSON.stringify(failure.message), { status: 422 })),
    );
});

interface RequestBody {
  clientName: string;
  redirectUris: string;
  scopes: string;
  website: string;
}

function validateBody(
  request: Record<string, unknown>,
): Result<RequestBody, Failure> {
  const clientName = request.client_name || request.clientName;
  const redirectUris = request.redirect_uris || request.redirectUris;
  const scopes = request.scopes;
  const website = request.website;

  if (typeof clientName !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'client_name is required',
      }),
    );
  }

  if (typeof redirectUris !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'redirect_uris is required',
      }),
    );
  }

  if (typeof scopes !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'scopes is required',
      }),
    );
  }

  if (typeof website !== 'string') {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'website is required',
      }),
    );
  }

  return ok({ clientName, redirectUris, scopes, website });
}

export const OPTIONS = AllCORS();
