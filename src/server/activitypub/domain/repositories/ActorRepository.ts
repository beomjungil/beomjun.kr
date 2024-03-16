import type { ResultAsync } from 'neverthrow';
import type { Failure } from '../../../failures';
import type { Actor } from '../entities/Actor';

export interface ActorRepository {
  findByUsername(username: string, domain: string): ResultAsync<Actor, Failure>;
}
