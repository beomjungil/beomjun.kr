import type { AstroGlobal } from 'astro';
import {
  configureCoreContainer,
  identical,
  type ExtendContainer,
  type ExtendedContainer,
} from '../dependencies/configureContainer';

export type PageHandler<T, V> = (container: ExtendedContainer<T>) => V;

export function PageHandler<T, V>(
  astro: AstroGlobal,
  handler: PageHandler<T, V>,
  extendContainer: ExtendContainer<T> = identical,
) {
  const container = extendContainer(
    configureCoreContainer({
      DB: astro.locals.runtime.env.DB,
      env: astro.locals.runtime.env,
    }),
  );

  return handler(container);
}
