import { APIRoute } from '@/server/route';
import { json } from '@/server/route/response';
import { okAsync } from 'neverthrow';

export const prerender = false;

export const GET = APIRoute('/.well-known/node-info', () => {
  return okAsync(
    json({
      links: [
        {
          rel: 'http://nodeinfo.diaspora.software/ns/schema/2.0',
          href: 'https://beomjun.kr/.well-known/nodeinfo/2.0',
        },
      ],
    }),
  );
});
