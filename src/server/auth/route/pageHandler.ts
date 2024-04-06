import { PageHandler } from '@/server/route/pageHandler';
import type { AstroGlobal } from 'astro';
import {
  configureAuthContainer,
  type AuthDependencyContainer,
} from '../dependencies/configureContainer';

export const AuthPageHandler = <V>(
  astro: AstroGlobal,
  handler: PageHandler<AuthDependencyContainer, V>,
) => PageHandler(astro, handler, configureAuthContainer);
