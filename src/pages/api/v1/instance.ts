import { APIRoute } from '@/server/route';
import { json } from '@/server/route/response';
import { okAsync } from 'neverthrow';

import { AllCORS } from '@/server/route/AllCORS';
import packageJson from '../../../../package.json';

export const prerender = false;

export const GET = APIRoute('/api/v1/instance', () => {
  return okAsync(
    json(
      {
        uri: 'beomjun.kr',
        title: 'beomjun.kr',
        short_description: packageJson.description,
        description: packageJson.description,
        email: 'gil@beomjun.kr',
        version: packageJson.version,
        thumbnail: 'https://beomjun.kr/og/en/og-image.png',
        languages: ['en', 'ko'],
        registrations: false,
        approval_required: false,
        invites_enabled: false,
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
      },
      { allowCors: true },
    ),
  );
});

export const OPTIONS = AllCORS();
