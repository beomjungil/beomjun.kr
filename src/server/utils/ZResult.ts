import { Result } from 'neverthrow';
import { ZodError, z } from 'zod';

import { FailureCode, type Failure } from '../failures';

const toFailure = (error: unknown): Failure => {
  if (error instanceof ZodError) {
    return {
      code: FailureCode.InvalidRequest,
      message: error.errors[0].message,
    };
  }
  return {
    code: FailureCode.InvalidRequest,
    message: 'Parse Error',
  };
};

export const zodParseResult = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  data: unknown,
) => Result.fromThrowable(schema.parse.bind(schema), toFailure)(data);
