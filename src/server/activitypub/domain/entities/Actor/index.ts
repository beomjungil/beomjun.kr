import { z } from 'zod';

import { ActorSchema } from './schema';

import {
  MASTODON_DISCOVERABLE,
  MASTODON_FEATURED,
  MASTODON_FEATURED_TAGS,
  SCHEMA_PROPERTY_VALUE,
  W3_ACTIVITY_STREAMS_NAMESPACE,
  W3_SECURITY_V1,
} from '@/server/activitypub/constants';
import { ZSchema } from '@/server/utils/ZSchema';
import { lets } from '@/server/utils/lets';

import { nonNullableArrayOf } from '@/server/utils/nonNullableArrayOf';
import type { WebfingerSchema } from './webfinger';

export const ActorData = z.object({
  id: z.string(),
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
});

export type ActorType = z.infer<typeof ActorData>['type'];

export class Actor extends ZSchema(ActorData) {
  get actorId(): string {
    return `https://${this.domain}/activity-pub/users/${this.username}`;
  }

  toSchema(): ActorSchema {
    return {
      '@context': [
        W3_ACTIVITY_STREAMS_NAMESPACE,
        W3_SECURITY_V1,
        SCHEMA_PROPERTY_VALUE,
        MASTODON_DISCOVERABLE,
        MASTODON_FEATURED,
        MASTODON_FEATURED_TAGS,
      ],
      id: this.actorId,
      type: this.type,
      discoverable: true,
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
      featuredTags: `${this.actorId}/collections/tags`,
      featured: `${this.actorId}/collections/featured`,
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
      attachment: [
        {
          type: 'PropertyValue',
          name: 'Homepage',
          value:
            '<a href="https://beomjun.kr" rel="me nofollow noopener noreferrer" target="_blank"><span class="invisible">https://</span><span class="">beomjun.kr</span><span class="invisible"></span></a>',
        },
      ],
    };
  }

  toWebfinger(): WebfingerSchema {
    return {
      subject: `acct:${this.username}@${this.domain}`,
      aliases: [
        `https://${this.domain}/profile/${this.username}`,
        `https://${this.domain}/activity-pub/users/${this.username}`,
      ],
      links: nonNullableArrayOf(
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
        lets(this.iconUrl, (iconUrl) => ({
          rel: 'http://webfinger.net/rel/avatar',
          type: 'image/png',
          href: iconUrl,
        })),
      ),
    };
  }
}
