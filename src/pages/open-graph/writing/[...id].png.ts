import { createOpenGraphImage } from '@/components/open-graph/base';
import { getTranslations, type AvailableLanguages } from '@/i18n/utils';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPostStaticPaths(language: AvailableLanguages) {
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

export async function writingOpenGraph(lang: AvailableLanguages, post: CollectionEntry<'blog'>) {
  const t = getTranslations(lang);
  return createOpenGraphImage({
    title: post.data.title,
    description: t('shortname'),
    lang,
  });
}

export async function GET({ props }: { props: { post: CollectionEntry<'blog'> } }) {
  return writingOpenGraph('ko', props.post);
}
