/* eslint-disable @typescript-eslint/no-explicit-any */
export type UseCase<Command = void, Result = void> = (
  command: Command,
) => Result;

type AnyUseCase = UseCase<any, any>;

export type UseCaseFactory<U extends AnyUseCase, Dependency = void> = (
  dependency: Dependency,
) => U;

type AnyUseCaseFactory = UseCaseFactory<AnyUseCase, any>;

type CommandOfUseCase<U extends AnyUseCase> =
  U extends UseCase<infer C, any> ? C : never;

export type CommandOf<F extends AnyUseCaseFactory> =
  F extends UseCaseFactory<infer U, any> ? CommandOfUseCase<U> : never;

export type UseCaseOf<F extends AnyUseCaseFactory> =
  F extends UseCaseFactory<infer U, any> ? U : never;

export function usecase<C = void, R = void, D = void>(
  executor: (dependency: D, command: C) => R,
): UseCaseFactory<UseCase<C, R>, D> {
  return (dependency: D) => (command: C) => executor(dependency, command);
}
