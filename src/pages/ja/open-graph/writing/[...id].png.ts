import { writingOpenGraph, getPostStaticPaths } from '@/pages/open-graph/writing/[...id].png';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  return getPostStaticPaths('ja');
}

export async function GET({ props }: { props: { post: CollectionEntry<'blog'> } }) {
  return writingOpenGraph('ja', props.post);
}
