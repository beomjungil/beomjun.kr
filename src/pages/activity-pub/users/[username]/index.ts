import { ActivityPubRoute } from '@/server/activitypub/route';
import { activityJson } from '@/server/route/response';

export const prerender = false;

export const GET = ActivityPubRoute(
  '/activity-pub/users/:username',
  ({ params }, container) => {
    const getActorByUsername = container.resolve('getActorByUsernameUseCase');

    return getActorByUsername({
      username: params.username,
      domain: 'beomjun.kr',
    })
      .map((actor) => actor.toSchema())
      .map(activityJson);
  },
);
