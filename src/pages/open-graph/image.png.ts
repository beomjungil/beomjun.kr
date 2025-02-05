import * as m from '@/i18n/paraglide/messages';
import type { AvailableLanguageTag } from '@/i18n/paraglide/runtime';
import { createOpenGraphImage } from '@/components/open-graph/base';

export async function mainOpenGraph(lang: AvailableLanguageTag) {
  return createOpenGraphImage({
    title: m.shortname({}, { languageTag: lang }),
    lang,
  });
}

export async function GET() {
  return mainOpenGraph('ko');
}
