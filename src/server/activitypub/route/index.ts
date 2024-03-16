import { APIRoute, type APIRouteFunction } from '@/server/route';
import {
  configureActivityPubContainer,
  type AcitivityPubContainer,
} from '../dependencies/configureContainer';

export const ActivityPubRoute = (
  name: string,
  route: APIRouteFunction<AcitivityPubContainer>,
) =>
  APIRoute<AcitivityPubContainer>(name, route, configureActivityPubContainer);
