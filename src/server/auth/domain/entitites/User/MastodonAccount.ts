import { z } from 'zod';

export const MastodonAccount = z.object({
  id: z.string(),
  username: z.string(),
  acct: z.string(),
  display_name: z.string(),
  locked: z.boolean(),
  bot: z.boolean(),
  discoverable: z.boolean().nullable(),
  indexable: z.boolean().nullable(),
  group: z.boolean(),
  created_at: z.string(),
  note: z.string(),
  url: z.string(),
  uri: z.string(),
  avatar: z.string(),
  avatar_static: z.string(),
  header: z.string(),
  header_static: z.string(),
  followers_count: z.number(),
  following_count: z.number(),
  statuses_count: z.number(),
  last_status_at: z.string(),
  hide_collections: z.boolean().nullable(),
  noindex: z.boolean().nullable(),
  source: z.object({
    privacy: z.string(),
    sensitive: z.boolean(),
    language: z.string().nullable(),
    note: z.string(),
    fields: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
        verified_at: z.string().nullable(),
      }),
    ),
    follow_requests_count: z.number(),
  }),
  emojis: z.array(
    z.object({
      shortcode: z.string(),
      url: z.string(),
      static_url: z.string(),
      visible_in_picker: z.boolean(),
    }),
  ),
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
      verified_at: z.string().nullable(),
    }),
  ),
  role: z.object({
    id: z.string(),
    name: z.string(),
    permissions: z.string(),
    color: z.string(),
    highlighted: z.boolean(),
  }),
});

export type MastodonAccount = z.infer<typeof MastodonAccount>;
