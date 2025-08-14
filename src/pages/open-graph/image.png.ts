import { createOpenGraphImage } from '@/components/open-graph/base';
import { getTranslations, type AvailableLanguages } from '@/i18n/utils';

export async function mainOpenGraph(lang: AvailableLanguages) {
  const t = getTranslations(lang);
  return createOpenGraphImage({
    title: t('shortname'),
    lang,
  });
}

export async function GET() {
  return mainOpenGraph('ko');
}
