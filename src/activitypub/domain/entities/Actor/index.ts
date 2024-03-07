import { z } from 'zod';

import { ActorSchema } from './schema';

import {
  W3_ACTIVITY_STREAMS_NAMESPACE,
  W3_SECURITY_V1,
} from '@/activitypub/constants';
import { ZSchema } from '@/activitypub/utils/ZSchema';
import { lets } from '@/activitypub/utils/lets';

export const ActorData = z.object({
  id: z.string().uuid(),
  type: z.enum(['Person', 'Service', 'Application', 'Group', 'Organization']),
  username: z.string(),
  domain: z.string(),
  name: z.string().optional(),
  summary: z.string().optional(),
  iconUrl: z.string().optional(),
  headerImageUrl: z.string().optional(),

  createdAt: z.date(),
  updatedAt: z.date(),

  publicKey: z.string(),
  privateKey: z.string(),
});

export class Actor extends ZSchema(ActorData) {
  get actorId(): string {
    return `https://${this.domain}/activity-pub/users/${this.username}`;
  }
  toSchema(): ActorSchema {
    return {
      '@context': [W3_ACTIVITY_STREAMS_NAMESPACE, W3_SECURITY_V1],
      id: this.actorId,
      type: this.type,
      following: `${this.actorId}/following`,
      followers: `${this.actorId}/followers`,
      inbox: `${this.actorId}/inbox`,
      outbox: `${this.actorId}/outbox`,
      preferredUsername: this.username,
      name: this.name,
      summary: this.summary,
      url: `https://${this.domain}/profile/${this.username}`,
      published: this.createdAt.toISOString(),
      updated: this.updatedAt.toISOString(),
      publicKey: {
        id: `${this.actorId}#main-key`,
        owner: this.actorId,
        publicKeyPem: this.publicKey,
      },
      endpoints: {
        sharedInbox: `https://${this.domain}/activity-pub/inbox`,
      },
      icon: lets(this.iconUrl, (iconUrl) => ({
        type: 'Image',
        mediaType: 'image/png',
        url: iconUrl,
      })),
      image: lets(this.headerImageUrl, (headerImageUrl) => ({
        type: 'Image',
        mediaType: 'image/png',
        url: headerImageUrl,
      })),
    };
  }
}
