export enum FailureCode {
  Database = 'DATABASE',
  Unknown = 'UNKNOWN',
}

export interface Failure {
  code: FailureCode;
  message: string;
  underlyingError?: unknown;
}
