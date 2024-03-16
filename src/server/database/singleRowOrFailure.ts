import { err, ok, type Result } from 'neverthrow';
import { failure, FailureCode, type Failure } from '../failures';

export function singleRowOrFailure<T>(rows: T[]): Result<T, Failure> {
  if (rows.length === 0) {
    return err(
      failure({
        code: FailureCode.NotFound,
        message: 'rowNotFound',
      }),
    );
  }

  if (rows.length > 1) {
    return err(
      failure({
        code: FailureCode.NotFound,
        message: 'rowTooMany',
      }),
    );
  }

  return ok(rows[0]);
}
