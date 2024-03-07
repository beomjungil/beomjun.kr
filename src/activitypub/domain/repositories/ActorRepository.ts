import type { ResultAsync } from 'neverthrow';
import type { Actor } from '../entities/Actor';
import type { Failure } from '../failures';

export interface ActorRepository {
  findByID(id: string): ResultAsync<Actor, Failure>;
  findByUsername(username: string, domain: string): ResultAsync<Actor, Failure>;
}
