import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';
import { match } from 'ts-pattern';

import fs from 'node:fs';

import type { Post } from '@/types/Post';

const size = {
  width: 1200,
  height: 630,
};
const getDefaultFontName = (locale: string) =>
  match(locale)
    .with('ko', () => 'SUITE')
    .with('ja', () => 'MPLUS1')
    .otherwise(() => 'DMSans');

const loadFont = (locale: string) =>
  fs.readFileSync(
    match(getDefaultFontName(locale))
      .with(
        'SUITE',
        () =>
          new URL('../../../public/fonts/SUITE-Heavy.woff', import.meta.url),
      )
      .with(
        'MPLUS1',
        () =>
          new URL('../../../public/fonts/MPLUS1-Black.woff', import.meta.url),
      )
      .otherwise(
        () =>
          new URL('../../../public/fonts/DMSans-Black.woff', import.meta.url),
      ),
  ).buffer;
const name: Record<string, string> = {
  ko: '길범준',
  en: 'Beomjun Gil',
  ja: 'ギル・ボムジュン',
};

export function GET({
  props: { post },
}: {
  params: {
    slug: string;
  };
  props: { post: Post };
}) {
  const fontName = getDefaultFontName(post.data.locale);
  const font = loadFont(post.data.locale);

  const defaultFontName = getDefaultFontName('en');
  const defaultFont = loadFont('en');

  const html = {
    type: 'div',
    props: {
      style: {
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontFamily: `${defaultFontName}, ${fontName}`,
              fontSize: 64,
              display: 'flex',
              flexDirection: 'column',
              width: 705,
              lineHeight: '139.3%',
              letterSpacing: '-2.88px',
              fontFeatureSettings: "'ss03' on, 'ss06' on, 'salt' on",
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: '#000',
                    fontWeight: 900,
                    marginBottom: 16,
                    display: 'flex',
                    padding: 42,
                    paddingRight: 120,
                    flex: 1,
                    wordBreak: 'keep-all',
                    overflowWrap: 'anywhere',
                  },
                  children: [post.data.title],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    background: '#FF4E5D',
                    height: '147px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 42,
                  },
                  children: [name[post.data.locale]],
                },
              },
            ],
          },
        },
        {
          type: 'svg',
          props: {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 495,
            height: 630,
            fill: 'none',
            children: [
              {
                type: 'path',
                props: {
                  fill: '#000',
                  d: 'M0 630V483h495v147z',
                },
              },
              {
                type: 'path',
                props: {
                  fill: '#FF4E5D',
                  fillRule: 'evenodd',
                  d: 'M0 0h495v483H0V0Zm189.428 426.832C129.372 450.05 65.004 462 0 462V0h494.998c0 60.67-12.803 120.747-37.679 176.8-24.876 56.052-61.338 106.983-107.302 149.883-45.965 42.901-100.533 76.931-160.589 100.149Z',
                  clipRule: 'evenodd',
                },
              },
              {
                type: 'path',
                props: {
                  fill: '#000',
                  d: 'M0 462c65.004 0 129.372-11.95 189.427-35.168 60.056-23.218 114.625-57.248 160.589-100.149 45.965-42.9 82.427-93.831 107.303-149.883C482.195 120.747 494.998 60.67 494.998 0H0v462Z',
                },
              },
            ],
          },
        },
      ],
    },
  };
  return new ImageResponse(html, {
    ...size,
    fonts:
      post.data.locale === 'en'
        ? [
            {
              name: fontName,
              data: font,
              style: 'normal',
              weight: 900,
            },
          ]
        : [
            {
              name: fontName,
              data: font,
              style: 'normal',
              weight: 900,
            },
            {
              name: defaultFontName,
              data: defaultFont,
              style: 'normal',
              weight: 900,
            },
          ],
  });
}

export const getStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.slug.replaceAll('/', '__') },
    props: { post },
  }));
};
