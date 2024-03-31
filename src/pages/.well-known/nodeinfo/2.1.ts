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
        name: 'mastodon',
        version: `beomjun.${packageJson.version}`,
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
        features: [],
        federation: {
          enabled: true,
          exclusions: false,
          mrf_hashtag: {
            federated_timeline_removal: [],
            reject: [],
            sensitive: ['nsfw'],
          },
          mrf_object_age: {
            actions: ['delist', 'strip_followers'],
            threshold: 604800,
          },
          mrf_policies: [
            'ObjectAgePolicy',
            'TagPolicy',
            'HashtagPolicy',
            'InlineQuotePolicy',
            'NormalizeMarkup',
          ],
          quarantined_instances: [],
          quarantined_instances_info: { quarantined_instances: {} },
        },
        fieldsLimits: {
          maxFields: 10,
          maxRemoteFields: 20,
          nameLength: 512,
          valueLength: 2048,
        },
        localBubbleInstances: [],
        pollLimits: {
          max_expiration: 31536000,
          max_option_chars: 200,
          max_options: 20,
          min_expiration: 0,
        },
        private: false,
        restrictedNicknames: [
          '.well-known',
          '~',
          'about',
          'activities',
          'api',
          'auth',
          'check_password',
          'dev',
          'friend-requests',
          'inbox',
          'internal',
          'main',
          'media',
          'nodeinfo',
          'notice',
          'oauth',
          'objects',
          'ostatus_subscribe',
          'pleroma',
          'proxy',
          'push',
          'registration',
          'relay',
          'settings',
          'status',
          'tag',
          'user-search',
          'user_exists',
          'users',
          'web',
          'verify_credentials',
          'update_credentials',
          'relationships',
          'search',
          'confirmation_resend',
          'mfa',
          'null',
        ],
        skipThreadContainment: true,
        staffAccounts: [],
        uploadLimits: {
          avatar: 2000000,
          background: 4000000,
          banner: 4000000,
          general: 16000000,
        },
      },
    }),
  );
});
