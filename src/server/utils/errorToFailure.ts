import { FailureCode, type Failure } from '../failures';

export function errorToFailure(error: unknown): Failure {
  return {
    code: FailureCode.Unknown,
    message: 'An unknown error occurred',
    underlyingError: error,
  };
}
