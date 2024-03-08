import { z } from 'zod';

import { ActorSchema } from './schema';

import {
  W3_ACTIVITY_STREAMS_NAMESPACE,
  W3_SECURITY_V1,
} from '@/server/activitypub/constants';
import { ZSchema } from '@/server/activitypub/utils/ZSchema';
import { lets } from '@/server/activitypub/utils/lets';

import type { WebfingerSchema } from './webfinger';

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

  toWebfinger(): WebfingerSchema {
    return {
      subject: `acct:${this.username}@${this.domain}`,
      aliases: [
        `https://${this.domain}/profile/${this.username}`,
        `https://${this.domain}/activity-pub/users/${this.username}`,
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: `https://${this.domain}/profile/${this.username}`,
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `https://${this.domain}/activity-pub/users/${this.username}`,
        },
        {
          rel: 'self',
          type: `application/ld+json; profile="${W3_ACTIVITY_STREAMS_NAMESPACE}"`,
          href: `https://${this.domain}/activity-pub/users/${this.username}`,
        },
      ],
    };
  }
}
