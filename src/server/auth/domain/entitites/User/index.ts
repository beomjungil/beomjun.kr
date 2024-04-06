import { z } from 'zod';

import { ZSchema } from '@/server/utils/ZSchema';
import { format } from 'date-fns';
import { MastodonAccount } from './MastodonAccount';

export const UserData = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  hashedPassword: z.string().optional(),
  headerImageUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
  summary: z.string().optional(),
  fullName: z.string().optional(),
});

export class User extends ZSchema(UserData) {
  get actorId(): string {
    return `https://beomjun.kr/activity-pub/users/${this.username}`;
  }

  toMastodonAccount(): MastodonAccount {
    // TODO: Should join with actor;
    return {
      id: this.id,
      username: this.username,
      acct: this.username,
      display_name: this.fullName ?? this.username,
      locked: false,
      bot: false,
      discoverable: true,
      indexable: true,
      group: false,
      created_at: new Date().toISOString(),
      note: '',
      url: `https://beomjun.kr/profile/${this.username}`,
      uri: `https://beomjun.kr/activity-pub/users/${this.username}`,
      avatar: this.profileImageUrl ?? '',
      avatar_static: this.profileImageUrl ?? '',
      header: this.headerImageUrl ?? '',
      header_static: this.headerImageUrl ?? '',
      followers_count: 0,
      following_count: 0,
      statuses_count: 0,
      last_status_at: format(new Date(), 'yyyy-MM-dd'),
      hide_collections: false,
      noindex: false,
      source: {
        privacy: 'public',
        sensitive: false,
        language: null,
        note: '',
        fields: [],
        follow_requests_count: 0,
      },
      emojis: [],
      fields: [
        {
          name: 'Website',
          value:
            '<a href="https:/beomjun.kr" rel="me nofollow noopener noreferrer" target="_blank"><span class="invisible">https://</span><span class="">beomjun.kr</span><span class="invisible"></span></a>',
          verified_at: new Date().toISOString(),
        },
      ],
      role: {
        // TODO: Fix this
        id: '1234',
        name: 'Owner',
        permissions: '1048575',
        color: '#000000',
        highlighted: true,
      },
    };
  }
}
