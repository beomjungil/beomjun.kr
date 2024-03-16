import { z } from 'zod';

export const W3_ACTIVITY_STREAMS_NAMESPACE =
  'https://www.w3.org/ns/activitystreams';
export const W3_SECURITY_V1 = 'https://w3id.org/security/v1';

export const SCHEMA_PROPERTY_VALUE_TYPE = z.object({
  schema: z.literal('http://schema.org#'),
  PropertyValue: z.literal('schema:PropertyValue'),
  value: z.literal('schema:value'),
});

export const SCHEMA_PROPERTY_VALUE: z.infer<typeof SCHEMA_PROPERTY_VALUE_TYPE> =
  {
    schema: 'http://schema.org#',
    PropertyValue: 'schema:PropertyValue',
    value: 'schema:value',
  };

export const MASTODON_DISCOVERABLE_TYPE = z.object({
  discoverable: z.literal('http://joinmastodon.org/ns#discoverable'),
});

export const MASTODON_DISCOVERABLE: z.infer<typeof MASTODON_DISCOVERABLE_TYPE> =
  { discoverable: 'http://joinmastodon.org/ns#discoverable' };

export const MASTODON_FEATURED_TYPE = z.object({
  '@id': z.literal('http://joinmastodon.org/ns#featured'),
  '@type': z.literal('@id'),
});

export const MASTODON_FEATURED: z.infer<typeof MASTODON_FEATURED_TYPE> = {
  '@id': 'http://joinmastodon.org/ns#featured',
  '@type': '@id',
};

export const MASTODON_FEATURED_TAGS_TYPE = z.object({
  '@id': z.literal('http://joinmastodon.org/ns#featuredTags'),
  '@type': z.literal('@id'),
});

export const MASTODON_FEATURED_TAGS: z.infer<
  typeof MASTODON_FEATURED_TAGS_TYPE
> = {
  '@id': 'http://joinmastodon.org/ns#featuredTags',
  '@type': '@id',
};
