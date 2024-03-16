export type ServiceFactory<Service, Dependency = void> = (
  dependency: Dependency,
) => Service;

export function service<Service, D = void>(
  construct: (dependency: D) => Service,
): ServiceFactory<Service, D> {
  return (dependency: D) => construct(dependency);
}
