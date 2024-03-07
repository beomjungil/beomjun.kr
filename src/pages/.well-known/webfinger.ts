import { W3_ACTIVITY_STREAMS_NAMESPACE } from '@/activitypub/constants';
import { getActorByUsername } from '@/activitypub/dependencies';

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async (req) => {
  const url = new URL(req.url);
  const resource = url.searchParams.get('resource');

  if (!resource)
    return new Response(
     null,
      {
        status: 404,
      },
    );

  const firstResource: string = Array.isArray(resource)
    ? resource[0]
    : resource;

  const account = firstResource.replaceAll('acct:', '');

  const [username, domain] = account.split('@');
  if (!domain)
    return new Response(
      null,
      {
        status: 404,
      },
    );

  const actor = await getActorByUsername({
    username,
    domain,
  });

  if (actor.isErr()) {
    return new Response(
      null,
      {
        status: 404,
      },
    );
  }

  return Response.json({
    subject: `acct:${username}@${domain}`,
    aliases: [
      `https://${domain}/profile/${username}`,
      `https://${domain}/activity-pub/users/${username}`
    ],
    links: [
      {
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: `https://${domain}/profile/${username}`,
      },
      {
        rel: 'self',
        type: 'application/activity+json',
        href: `https://${domain}/activity-pub/users/${username}`,
      },
      {
        rel: 'self',
        type: `application/ld+json; profile="${W3_ACTIVITY_STREAMS_NAMESPACE}"`,
        href: `https://${domain}/activity-pub/users/${username}`,
      },
    ],
  });
};
