import { writingOpenGraph, getPostStaticPaths } from '@/pages/open-graph/writing/[...id].png';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  return getPostStaticPaths('en');
}

export async function GET({ props }: { props: { post: CollectionEntry<'blog'> } }) {
  return writingOpenGraph('en', props.post);
}
