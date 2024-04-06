import type { Failure } from '@/server/failures';
import type { ResultAsync } from 'neverthrow';
import type { Scope } from '../../types/Scope';
import type { Application } from '../entitites/Application';

interface CreateApplicationRequest {
  id: string;
  secret: string;
  name: string;
  redirectUris: string[];
  website: string;
  createdAt: Date;
  scopes: Scope[];
}

export interface ApplicationRepository {
  create(request: CreateApplicationRequest): ResultAsync<Application, Failure>;

  getByName(name: string): ResultAsync<Application, Failure>;

  getById(id: string): ResultAsync<Application, Failure>;
}
