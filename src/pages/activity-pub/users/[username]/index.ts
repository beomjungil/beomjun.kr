import { getActorByUsername } from '@/activitypub/dependencies';

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = params.username;

  if (!id) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const actor = await getActorByUsername({
    username: id,
    domain: 'beomjun.kr',
  });

  return actor.match(
    (actor) => {
      return Response.json(actor, {
        headers: {
          'Content-Type': 'application/activity+json',
        },
      });
    },
    () => {
      return new Response(null, {
        status: 404,
        statusText: 'Not found',
      });
    },
  );
};
