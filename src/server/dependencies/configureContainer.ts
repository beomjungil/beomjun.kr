import type { AstroGlobal } from 'astro';
import {
  asFunction,
  asValue,
  createContainer,
  type AwilixContainer,
} from 'awilix';
import type { Logger } from 'pino';
import { createDrizzle, type Database } from '../database/drizzle';
import { logger } from '../logger';

export interface DependencyContainer {
  database: Database;
  logger: Logger;
  env: AstroGlobal['locals']['runtime']['env'];
}

interface ContainerParams {
  DB: D1Database;
  name?: string;
  env: AstroGlobal['locals']['runtime']['env'];
}

export type ExtendedContainer<T> = T extends never
  ? AwilixContainer<DependencyContainer>
  : AwilixContainer<DependencyContainer & T>;

export type ExtendContainer<T> = (
  container: AwilixContainer<DependencyContainer>,
) => ExtendedContainer<T>;

export function extendContainer<T>(
  configureContainer: (container: ExtendedContainer<T>) => ExtendedContainer<T>,
): ExtendContainer<T> {
  return (container) => configureContainer(container as ExtendedContainer<T>);
}

export const identical = extendContainer<never>((container) => container);

export function configureCoreContainer({ DB, name, env }: ContainerParams) {
  const container = createContainer<DependencyContainer>();
  return container.register({
    logger: asFunction(() => logger.child({ endpoint: name })),
    database: asFunction(() => createDrizzle(DB)).singleton(),
    env: asValue(env),
  });
}
