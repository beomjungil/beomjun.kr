import { z } from 'zod';

import {
  W3_ACTIVITY_STREAMS_NAMESPACE,
  W3_SECURITY_V1,
} from '@/activitypub/constants';

export const ActorSchema = z.object({
  '@context': z.array(
    z.union([
      z.literal(W3_ACTIVITY_STREAMS_NAMESPACE),
      z.literal(W3_SECURITY_V1),
    ]),
  ),
  id: z.string(),
  type: z.enum(['Person', 'Service', 'Application', 'Group', 'Organization']),
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
});

export type ActorSchema = z.infer<typeof ActorSchema>;
