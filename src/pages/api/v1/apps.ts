import { ActivityPubRoute } from '@/server/activitypub/route';
import { FailureCode, failure, type Failure } from '@/server/failures';
import { json } from '@/server/route/response';
import { ResultAsync, err, errAsync, ok, type Result } from 'neverthrow';

export const prerender = false;

export const POST = ActivityPubRoute(
  '/api/v1/apps',
  ({ request }, container) => {
    const createApplication = container.resolve('createApplicationUseCase');

    return getRequestBody(request)
      .andThen(({ clientName, redirectUris, scopes, website }) =>
        createApplication({
          name: clientName,
          redirectUris: redirectUris.split(' '),
          website,
          scopes: scopes.split(' '),
        }),
      )
      .map((application) => json(application.toContract()))
      .orElse((failure) =>
        ok(new Response(JSON.stringify(failure.message), { status: 422 })),
      );
  },
);

interface RequestBody {
  clientName: string;
  redirectUris: string;
  scopes: string;
  website: string;
}

function getRequestBody(request: Request): ResultAsync<RequestBody, Failure> {
  const contentType =
    request.headers.get('Content-Type') ||
    request.headers.get('content-type') ||
    '';

  if (contentType.includes('json')) {
    return ResultAsync.fromSafePromise(request.json()).andThen(getJson);
  }

  if (contentType.includes('form')) {
    return ResultAsync.fromSafePromise(request.formData()).andThen(getFormData);
  }

  return errAsync(
    failure({
      code: FailureCode.InvalidRequest,
      message: 'Invalid Content-Type',
    }),
  );
}

function getJson(request: unknown): Result<RequestBody, Failure> {
  if (typeof request !== 'object' || request === null) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'Invalid request',
      }),
    );
  }

  const clientName = (request as Record<string, unknown>).client_name;
  const redirectUris = (request as Record<string, unknown>).redirect_uris;
  const scopes = (request as Record<string, unknown>).scopes;
  const website = (request as Record<string, unknown>).website;

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

function getFormData(formData: FormData): Result<RequestBody, Failure> {
  const clientName = formData.get('client_name')?.toString();
  const redirectUris = formData.get('redirect_uris')?.toString();
  const scopes = formData.get('scopes')?.toString();
  const website = formData.get('website')?.toString();

  if (!clientName) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'client_name is required',
      }),
    );
  }

  if (!redirectUris) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'redirect_uris is required',
      }),
    );
  }

  if (!scopes) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'scopes is required',
      }),
    );
  }

  if (!website) {
    return err(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'website is required',
      }),
    );
  }

  return ok({ clientName, redirectUris, scopes, website });
}
