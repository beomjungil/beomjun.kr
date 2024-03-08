export enum FailureCode {
  Database = 'DATABASE',
  NotFound = 'NOT_FOUND',
  InvalidRequest = 'INVALID_REQUEST',
  Unknown = 'UNKNOWN',
}

export interface Failure {
  code: FailureCode;
  message: string;
  underlyingError?: unknown;
}
