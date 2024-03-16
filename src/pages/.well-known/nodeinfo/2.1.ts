import { APIRoute } from '@/server/route';
import { json } from '@/server/route/response';
import { okAsync } from 'neverthrow';

import packageJson from '../../../../package.json';

export const prerender = false;

export const GET = APIRoute('/.well-known/nodeinfo/2.1', () => {
  return okAsync(
    json({
      version: '2.1',
      software: {
        name: packageJson.name,
        version: packageJson.version,
      },
      protocols: ['activitypub'],
      services: {
        outbound: [],
        inbound: [],
      },
      // TODO: Replace with actual data
      usage: {
        users: {
          total: 1,
          activeMonth: 1,
          activeHalfyear: 1,
        },
        localPosts: 1,
      },
      openRegistrations: false,
      metadata: {
        accountActivationRequired: true,
        suggestions: { enabled: false },
        postFormats: ['text/plain', 'text/html'],
        mailerEnabled: false,
        invitesEnabled: false,
        nodeName: 'beomjun.kr',
        nodeDescription: 'A personal website of Beomjun Gil.',
      },
    }),
  );
});
