export type Falsy = null | undefined | false | 0 | 0n | '';

export type TruthyTypesOf<T> = T extends Falsy ? never : T;

export function strictLet<T, U>(
  target: T,
  player: (target: NonNullable<T>) => U,
): U | undefined;

export function strictLet<T, U>(
  target: T,
  player: (target: NonNullable<T>) => U,
  defaultValue: U,
): U;

export function strictLet<T, U>(
  target: T,
  player: (target: NonNullable<T>) => U,
  defaultValue?: U,
): U | undefined {
  if (target === null || target === undefined) {
    return defaultValue;
  }
  return player(target);
}

export function lets<T, U>(
  target: T,
  player: (target: TruthyTypesOf<T>) => U,
): U | undefined;

export function lets<T, U>(
  target: T,
  player: (target: TruthyTypesOf<T>) => U,
  defaultValue: U,
): U;

export function lets<T, U>(
  target: T,
  player: (target: TruthyTypesOf<T>) => U,
  defaultValue?: U,
): U | undefined {
  if (!target) {
    return defaultValue;
  }
  return player(target as TruthyTypesOf<T>);
}

export function noop<T>(target: T): T {
  return target;
}
