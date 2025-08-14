import { createOpenGraphImage } from '@/components/open-graph/base';
import { getTranslations, type AvailableLanguages } from '@/i18n/utils';

export async function nowOpenGraph(lang: AvailableLanguages) {
  const t = getTranslations(lang);
  return createOpenGraphImage({
    title: t('now'),
    description: t('name'),
    lang,
  });
}

export async function GET() {
  return nowOpenGraph('ko');
}
