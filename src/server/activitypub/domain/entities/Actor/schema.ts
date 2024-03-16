import { z } from 'zod';

import {
  MASTODON_DISCOVERABLE_TYPE,
  MASTODON_FEATURED_TAGS_TYPE,
  MASTODON_FEATURED_TYPE,
  SCHEMA_PROPERTY_VALUE_TYPE,
  W3_ACTIVITY_STREAMS_NAMESPACE,
  W3_SECURITY_V1,
} from '@/server/activitypub/constants';

export const ActorSchema = z.object({
  '@context': z.array(
    z.union([
      z.literal(W3_ACTIVITY_STREAMS_NAMESPACE),
      z.literal(W3_SECURITY_V1),
      SCHEMA_PROPERTY_VALUE_TYPE,
      MASTODON_DISCOVERABLE_TYPE,
      MASTODON_FEATURED_TAGS_TYPE,
      MASTODON_FEATURED_TYPE,
    ]),
  ),
  id: z.string(),
  type: z.enum(['Person', 'Service', 'Application', 'Group', 'Organization']),
  discoverable: z.boolean(),
  following: z.string().url(),
  followers: z.string().url(),
  inbox: z.string().url(),
  outbox: z.string().url(),
  preferredUsername: z.string(),
  name: z.string().optional(),
  summary: z.string().optional(),
  url: z.string().url(),
  published: z.string(),
  updated: z.string(),
  publicKey: z.object({
    id: z.string(),
    owner: z.string(),
    publicKeyPem: z.string(),
  }),
  featuredTags: z.string(),
  featured: z.string(),
  icon: z
    .object({
      type: z.literal('Image'),
      mediaType: z.string(),
      url: z.string().url(),
    })
    .optional(),
  image: z
    .object({
      type: z.literal('Image'),
      mediaType: z.string(),
      url: z.string().url(),
    })
    .optional(),
  endpoints: z.object({
    sharedInbox: z.string().url(),
  }),
  attachment: z.array(
    z.object({
      type: z.string(),
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export type ActorSchema = z.infer<typeof ActorSchema>;
