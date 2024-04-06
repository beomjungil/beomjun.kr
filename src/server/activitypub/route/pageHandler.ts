import { PageHandler } from '@/server/route/pageHandler';
import type { AstroGlobal } from 'astro';
import {
  configureActivityPubContainer,
  type ActivityPubContainer,
} from '../dependencies/configureContainer';

export const ActivityPubPageHandler = <V>(
  astro: AstroGlobal,
  handler: PageHandler<ActivityPubContainer, V>,
) => PageHandler(astro, handler, configureActivityPubContainer);
