import { ResultAsync } from 'neverthrow';

import { Supabase } from '../supabase';

import { Actor } from '@/server/activitypub/domain/entities/Actor';
import { type Failure } from '@/server/activitypub/domain/failures';

import type { ActorRepository } from '@/server/activitypub/domain/repositories/ActorRepository';

export const ActorRepositoryImpl: ActorRepository = {
  findByID(id: string): ResultAsync<Actor, Failure> {
    return Supabase.query(
      (supabase) => supabase.from('actor').select('*').eq('id', id).single(),
      {
        converter: (data) =>
          Actor.parse({
            id: data.id,
            type: data.type,
            username: data.username,
            domain: data.domain,
            name: data.name || undefined,
            summary: data.summary || undefined,
            iconUrl: data.icon_url || undefined,
            headerImageUrl: data.header_image_url || undefined,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            publicKey: data.public_key,
            privateKey: data.private_key,
          }),
      },
    );
  },
  findByUsername(
    username: string,
    domain: string,
  ): ResultAsync<Actor, Failure> {
    return Supabase.query(
      (supabase) =>
        supabase
          .from('actor')
          .select('*')
          .eq('username', username)
          .eq('domain', domain)
          .single(),
      {
        converter: (data) =>
          Actor.parse({
            id: data.id,
            type: data.type,
            username: data.username,
            domain: data.domain,
            name: data.name || undefined,
            summary: data.summary || undefined,
            iconUrl: data.icon_url || undefined,
            headerImageUrl: data.header_image_url || undefined,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            publicKey: data.public_key,
            privateKey: data.private_key,
          }),
      },
    );
  },
};
