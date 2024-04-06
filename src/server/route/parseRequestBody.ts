import { errAsync, Result, ResultAsync } from 'neverthrow';
import { failure, FailureCode, type Failure } from '../failures';

function isJson(contentType: string): boolean {
  return contentType.includes('json');
}

function isFormData(contentType: string): boolean {
  return contentType.includes('form');
}

export function parseRequestBody<T>(
  request: Request,
  validateBody: (data: Record<string, unknown>) => Result<T, Failure>,
): ResultAsync<T, Failure> {
  const contentType =
    request.headers.get('Content-Type') ||
    request.headers.get('content-type') ||
    '';

  if (!isJson(contentType) && !isFormData(contentType)) {
    return errAsync(
      failure({
        code: FailureCode.InvalidRequest,
        message: 'Invalid Content-Type',
      }),
    );
  }

  const dataPromise = isJson(contentType) ? request.json() : request.formData();

  return ResultAsync.fromSafePromise(dataPromise).andThen((data) =>
    isFormData(contentType)
      ? (() => {
          const entries = Object.fromEntries((data as FormData).entries());
          return validateBody(entries as Record<string, unknown>);
        })()
      : (() => {
          if (typeof data !== 'object' || data === null) {
            return errAsync(
              failure({
                code: FailureCode.InvalidRequest,
                message: 'Invalid request body',
              }),
            );
          }
          return validateBody(data as Record<string, unknown>);
        })(),
  );
}
