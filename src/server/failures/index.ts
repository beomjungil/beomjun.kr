export enum FailureCode {
  Database = 'DATABASE',
  AuthProvider = 'AUTH_PROVIDER',
  NotFound = 'NOT_FOUND',
  InvalidRequest = 'INVALID_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  Unknown = 'UNKNOWN',
}

export interface Failure {
  code: FailureCode;
  message: string;
  underlyingError?: unknown;
}

export function failure(
  failure: Failure = {
    code: FailureCode.Unknown,
    message: 'unknownError',
  },
): Failure {
  return failure;
}

export function unknownFailure(underlyingError?: unknown): Failure {
  return {
    code: FailureCode.Unknown,
    message: 'unknownError',
    underlyingError,
  };
}
