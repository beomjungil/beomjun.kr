import { APIRoute } from '@/server/api-route';
import { json } from '@/server/api-route/response';
import { okAsync } from 'neverthrow';

export const prerender = false;

export const GET = APIRoute('/.well-known/nodeinfo', () => {
  return okAsync(
    json({
      links: [
        {
          rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
          href: 'https://beomjun.kr/nodeinfo/2.1',
        },
      ],
    }),
  );
});
