import sharp from 'sharp';
import satori, { type SatoriOptions } from 'satori';
import { html } from 'satori-html';
import * as m from '@/i18n/paraglide/messages';
import type { AvailableLanguageTag } from '@/i18n/paraglide/runtime';
import PretendardJPBold from '@/assets/og-fonts/_PretendardJP-Bold.otf';

const satoriOptions: SatoriOptions = {
  width: 1200,
  height: 675,
  fonts: [
    {
      name: 'Pretendard JP',
      data: Buffer.from(PretendardJPBold),
      weight: 400,
      style: 'normal',
    },
  ],
};

export async function mainOpenGraph(lang: AvailableLanguageTag) {
  const markup = html`<html style="width: 100%; height: 100%; font-family: 'Pretendard JP', sans-serif; font-feature-settings: "calt", "ss01", "ss02", "ss03", "ss15", "ss11";" lang="${lang}" >
    <body style="margin: 0; padding: 0; width: 100%; height: 100%; gap: 3em; display: flex; justify-content: center; align-items: center; background-color: rgb(252, 251, 243); color: rgb(18, 18, 17);">
      <svg style="width: 11.25em; height: 11.25em;" width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="196.267" width="59.7331" height="187.733" fill="currentColor"/>
        <rect x="0.000732422" y="256" width="59.7333" height="255.999" transform="rotate(-90 0.000732422 256)" fill="currentColor"/>
        <path d="M8.03451e-06 187.733C24.6534 187.733 49.0654 182.877 71.8422 173.443C94.619 164.008 115.314 150.18 132.747 132.748C150.18 115.315 164.008 94.6193 173.442 71.8424C182.877 49.0656 187.733 24.6535 187.733 0L1.52588e-05 6.95475e-06L8.03451e-06 187.733Z" fill="currentColor"/>
      </svg>

      <div style="font-size: 11.25em; letter-spacing: -0.05em; font-weight: 700;">
        ${m.shortname({}, { languageTag: lang })}
      </div>
    </body>
  </html>`;

  const svg = await satori(markup, satoriOptions);

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}

export async function GET() {
  return mainOpenGraph('ko');
}
