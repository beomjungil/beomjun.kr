import { json } from '@/server/route/response';

import { AuthRoute } from '@/server/auth/route';
import { AllCORS } from '@/server/route/AllCORS';
import { okAsync } from 'neverthrow';
import packageJson from '../../../../package.json';

export const prerender = false;

export const GET = AuthRoute('/api/v2/instance', (_, container) => {
  const getUserByID = container.resolve('getUserByIDUseCase');

  const instance = {
    domain: 'beomjun.kr',
    title: 'beomjun.kr',
    version: packageJson.version,
    description: packageJson.description,
    usage: {
      users: {
        total: 1,
        active_onth: 1,
        active_half_year: 1,
      },
    },
    thumbnail: {
      url: 'https://beomjun.kr/og/en/og-image.png',
      blurhash: 'L7S6MUt7_3xu%MayWBj[~pj[4nWB',
    },
    languages: ['en', 'ko'],
    configuration: {
      statuses: {
        max_characters: 500,
        max_media_attachments: 4,
        characters_reserved_per_url: 23,
      },
      media_attachments: {
        supported_mime_types: [
          'image/jpeg',
          'image/png',
          'image/heic',
          'image/heif',
          'video/quicktime',
          'video/mp4',
          'video/webm',
          'audio/mp4',
        ],
        image_size_limit: 209715200,
        image_matrix_limit: 16777216,
        video_size_limit: 209715200,
        video_frame_rate_limit: 60,
        video_matrix_limit: 2304000,
      },
      polls: {
        max_options: 20,
        max_characters_per_option: 200,
        min_expiration: 0,
        max_expiration: 31536000,
      },
    },
    registrations: {
      enabled: false,
      approval_required: true,
      message: null,
      url: null,
    },
    contact: {
      email: 'gil@beomjun.kr',
      account: null,
    },
    rules: [
      {
        id: '1',
        text: 'beomjun.kr은 개인용 인스턴스 입니다.',
        hint: '마스토돈 클라이언트와 호환되도록 직접 개발한 인스턴스이며, 실제로 마스토돈 서버가 아닙니다. 개인적 사용을 위해 만들어졌으며, 다른 사용자의 가입을 위한 목적으로 만들어지지 않았습니다.',
      },
      {
        id: '2',
        text: 'Sexually explicit or violent media must be marked as sensitive or with a content warning',
        hint: 'This includes content that is particularly provocative even if it may not show specific body parts, as well as dead bodies, bloody injuries, and other gore. Particularly obscene content may be prohibited entirely. Profile pictures and header images may not contain sexually explicit or violent media.',
      },
      {
        id: '3',
        text: 'No racism, sexism, homophobia, transphobia, ableism, xenophobia, or casteism.',
        hint: 'Transphobic behavior such as intentional misgendering and deadnaming is strictly prohibited. Promotion of "conversion therapy" is strictly prohibited. Criticism of governments and religions is permissible unless being used as a proxy for discrimination.',
      },
      {
        id: '4',
        text: 'No incitement of violence or promotion of violent ideologies',
        hint: 'Calling for people or groups to be assassinated, murdered, or attacked physically is strictly prohibited. Support for violent groups or events is prohibited.',
      },
      {
        id: '5',
        text: 'No harassment, block evasion, dogpiling, or doxxing of others',
        hint: 'Repeat attempts to communicate with users who have blocked you or creation of accounts solely to harass or insult individuals is strictly prohibited. Coordinated activity to attack other users is prohibited. Posting of private personal information about others is prohibited.',
      },
      {
        id: '6',
        text: 'Do not share information widely-known to be false and misleading',
        hint: 'False and misleading information and links from low-quality sources may not be posted, especially if they are likely to mislead or confuse others or endanger their safety.',
      },
      {
        id: '1008',
        text: 'Content created by others must be attributed, and use of generative AI must be disclosed',
        hint: 'Content created by others must clearly provide a reference to the author, creator, or source. For adult content, this should include performers. Accounts may not solely post AI-generated content.',
      },
    ],
  };

  return getUserByID({ id: 'h3h1631lwzgl26e' })
    .map((user) =>
      json(
        {
          ...instance,
          contact: {
            ...instance.contact,
            account: user.toMastodonAccount(),
          },
        },
        { allowCors: true },
      ),
    )
    .orElse(() => okAsync(json(instance)));
});

export const OPTIONS = AllCORS();
