export const nonNullableArrayOf = <T>(
  ...array: (T | undefined)[]
): NonNullable<T>[] => {
  return array?.filter((item): item is NonNullable<T> => !!item) ?? [];
};
