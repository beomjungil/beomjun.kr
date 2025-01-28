import * as m from '@/i18n/paraglide/messages';
import type { AvailableLanguageTag } from '@/i18n/paraglide/runtime';
import { createOpenGraphImage } from '@/components/open-graph/base';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPostStaticPaths(language: AvailableLanguageTag) {
  const posts = await getCollection('blog');
  return posts
    .filter((post) => {
      if (language === 'ko') {
        return !post.id.match(/^(en|ja)-/);
      }

      if (language === 'ja') {
        return post.id.startsWith('ja-') || !post.id.startsWith('en-');
      }

      if (language === 'en') {
        return post.id.startsWith('en-') || !post.id.startsWith('ja-');
      }

      return post.id.startsWith(`${language}-`);
    })
    .map((post) => ({
      params: {
        id: post.id,
      },
      props: {
        post,
      },
    }));
}

export async function getStaticPaths() {
  return getPostStaticPaths('ko');
}

export async function writingOpenGraph(lang: AvailableLanguageTag, post: CollectionEntry<'blog'>) {
  return createOpenGraphImage({
    title: post.data.title,
    description: m.shortname({}, { languageTag: lang }),
    lang,
  });
}

export async function GET({ props }: { props: { post: CollectionEntry<'blog'> } }) {
  return writingOpenGraph('ko', props.post);
}
