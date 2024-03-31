import { APIRoute, type APIRouteFunction } from '@/server/route';
import {
  configureActivityPubContainer,
  type ActivityPubContainer,
} from '../dependencies/configureContainer';

export const ActivityPubRoute = (
  name: string,
  route: APIRouteFunction<ActivityPubContainer>,
) => APIRoute<ActivityPubContainer>(name, route, configureActivityPubContainer);
