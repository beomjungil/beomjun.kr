import type { Failure } from '@/server/failures';
import type { ResultAsync } from 'neverthrow';
import type { Application } from '../entities/Application';
import type { Scope } from '../types/Scope';

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
}
