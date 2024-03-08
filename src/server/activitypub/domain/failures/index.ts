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
