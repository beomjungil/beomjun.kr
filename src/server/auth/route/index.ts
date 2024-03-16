import { APIRoute, type APIRouteFunction } from '@/server/route';
import {
  configureAuthContainer,
  type AuthDependencyContainer,
} from '../dependencies/configureContainer';

export const AuthRoute = (
  name: string,
  route: APIRouteFunction<AuthDependencyContainer>,
) => APIRoute<AuthDependencyContainer>(name, route, configureAuthContainer);
