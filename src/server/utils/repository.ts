export type RepositoryFactory<Repository, Dependency = void> = (
  dependency: Dependency,
) => Repository;

export function repository<Repository, D = void>(
  construct: (dependency: D) => Repository,
): RepositoryFactory<Repository, D> {
  return (dependency: D) => construct(dependency);
}
