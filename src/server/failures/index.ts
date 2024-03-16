export enum FailureCode {
  Database = 'DATABASE',
  AuthProvider = 'AUTH_PROVIDER',
  NotFound = 'NOT_FOUND',
  InvalidRequest = 'INVALID_REQUEST',
  Unknown = 'UNKNOWN',
}

export interface Failure {
  code: FailureCode;
  message: string;
  underlyingError?: unknown;
}

export function failure(failure: Failure): Failure {
  return failure;
}

export function unknownFailure(underlyingError?: unknown): Failure {
  return {
    code: FailureCode.Unknown,
    message: 'unknownError',
    underlyingError,
  };
}
