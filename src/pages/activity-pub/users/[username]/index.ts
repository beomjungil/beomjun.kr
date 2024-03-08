import { getActorByUsername } from '@/server/activitypub/dependencies';
import { APIRoute } from '@/server/api-route';
import { activityJson } from '@/server/api-route/response';

export const prerender = false;

export const GET = APIRoute('/activity-pub/users/:username', ({ params }) => {
  return getActorByUsername({
    username: params.username,
    domain: 'beomjun.kr',
  }).map(activityJson);
});
