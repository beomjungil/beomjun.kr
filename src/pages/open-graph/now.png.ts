import * as m from '@/i18n/paraglide/messages';
import type { AvailableLanguageTag } from '@/i18n/paraglide/runtime';
import { createOpenGraphImage } from '@/components/open-graph/base';

export async function nowOpenGraph(lang: AvailableLanguageTag) {
  return createOpenGraphImage({
    title: m.now({}, { languageTag: lang }),
    description: m.name({}, { languageTag: lang }),
    lang,
  });
}

export async function GET() {
  return nowOpenGraph('ko');
}
