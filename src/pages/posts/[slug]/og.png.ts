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
    .with('ko', () => 'SUIT')
    .with('ja', () => 'Murecho')
    .otherwise(() => 'Satoshi');

const loadFont = (locale: string) =>
  fs.readFileSync(
    match(getDefaultFontName(locale))
      .with(
        'SUIT',
        () =>
          new URL('../../../public/fonts/SUIT-ExtraBold.ttf', import.meta.url),
      )
      .with(
        'Murecho',
        () =>
          new URL('../../../public/fonts/Murecho-Bold.ttf', import.meta.url),
      )
      .otherwise(
        () =>
          new URL('../../../public/fonts/Satoshi-Bold.woff', import.meta.url),
      ),
  ).buffer;
const name: Record<string, object> = {
  ko: {
    type: 'svg',
    props: {
      width: 239,
      height: 67,
      viewBox: '0 0 796 223',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      children: [
        {
          type: 'path',
          props: {
            d: 'M412.262 9.5H579.262V36H519.512C523.762 53.25 544.762 71 588.762 75.5L576.512 102C534.262 97 507.262 79.75 495.512 57C484.012 79.75 456.762 97 414.762 102L402.512 75.5C446.512 71 467.512 53 471.762 36H412.262V9.5ZM393.762 138.25V112H597.512V138.25H515.262V175.75H481.762V138.25H393.762ZM417.262 221.5V156.5H450.512V195H575.012V221.5H417.262Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M204.506 12.75H237.756V42H278.756V12.75H311.506V52.75H350.506V0.25H384.006V130.25H350.506V79.5H311.506V121H204.506V12.75ZM233.506 222.75V139.5H384.006V222.75H233.506ZM237.756 94.75H278.756V67.75H237.756V94.75ZM266.256 196.5H351.256V165.25H266.256V196.5Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M150.75 0H184V112.75H150.75V0ZM0 90.75C55.25 81 76.25 60.25 79.5 34.5H12V8H116.25C116.25 70 83 103.25 11.5 117.5L0 90.75ZM33.75 147.25V122H184V183.5H67.25V197.25H189.5V223H34V159.75H150.5V147.25H33.75Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'rect',
          props: {
            x: 763.312,
            y: 85,
            width: 32.1998,
            height: 101.2,
            fill: '#F7F6ED',
          },
        },
        {
          type: 'rect',
          props: {
            x: 657.512,
            y: 222.999,
            width: 32.2,
            height: 137.999,
            transform: 'rotate(-90 657.512 222.999)',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M657.512 186.2C670.801 186.2 683.961 183.582 696.239 178.497C708.517 173.411 719.673 165.957 729.071 156.559C738.468 147.162 745.922 136.006 751.008 123.728C756.094 111.449 758.711 98.2898 758.711 85L657.512 85L657.512 186.2Z',
            fill: '#F7F6ED',
          },
        },
      ],
    },
  },
  en: {
    type: 'svg',
    props: {
      width: 200,
      height: 67,
      viewBox: '0 0 593 198',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      children: [
        {
          type: 'rect',
          props: {
            x: 560.312,
            y: 57,
            width: 32.1998,
            height: 101.2,
            fill: '#F7F6ED',
          },
        },
        {
          type: 'rect',
          props: {
            x: 454.512,
            y: 195,
            width: 32.2,
            height: 137.999,
            transform: 'rotate(-90 454.512 195)',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M454.512 158.2C467.801 158.2 480.961 155.582 493.239 150.497C505.517 145.411 516.673 137.957 526.071 128.559C535.468 119.162 542.922 108.006 548.008 95.7276C553.094 83.4494 555.711 70.2898 555.711 57L454.512 57L454.512 158.2Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M312.815 3.89844V194.998H275.115V3.89844H312.815ZM281.875 194.998V160.158H390.555V194.998H281.875Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M244.504 3.89844V194.998H206.804V3.89844H244.504Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M96.5601 36.1393C84.4268 36.1393 74.2001 38.826 65.8801 44.1993C57.5601 49.5726 51.2335 57.1126 46.9001 66.8193C42.5668 76.526 40.4001 87.966 40.4001 101.139C40.4001 114.486 42.7401 125.839 47.4201 135.199C52.2735 144.386 58.8601 151.319 67.1801 155.999C75.6734 160.506 85.3801 162.759 96.3001 162.759C104.793 162.759 112.16 161.633 118.4 159.379C124.813 157.126 130.1 154.006 134.26 150.019C138.42 145.859 141.54 141.006 143.62 135.459C145.7 129.913 146.74 123.933 146.74 117.519V101.659L164.68 119.339H92.4001V86.3193H182.1V194.999H149.86L146.74 166.399L150.9 170.559C148.127 175.933 143.793 180.699 137.9 184.859C132.18 188.846 125.333 192.053 117.36 194.479C109.387 196.733 100.893 197.859 91.8801 197.859C74.0268 197.859 58.2535 193.786 44.5601 185.639C30.8668 177.493 20.1201 166.139 12.3201 151.579C4.52012 136.846 0.620117 119.599 0.620117 99.8393C0.620117 80.5993 4.60679 63.526 12.5801 48.6193C20.7268 33.7126 31.9935 22.0126 46.3801 13.5193C60.9401 5.02596 77.9268 0.779297 97.3401 0.779297C112.247 0.779297 125.767 3.46597 137.9 8.8393C150.033 14.2126 159.913 21.926 167.54 31.9793C175.34 41.8593 180.02 53.4726 181.58 66.8193H141.8C139.2 56.246 133.653 48.5326 125.16 43.6793C116.84 38.6526 107.307 36.1393 96.5601 36.1393Z',
            fill: '#F7F6ED',
          },
        },
      ],
    },
  },
  ja: {
    type: 'svg',
    props: {
      width: 388,
      height: 67,
      viewBox: '0 0 1325 229',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      children: [
        {
          type: 'rect',
          props: {
            x: 1297,
            y: 106,
            width: 27.9998,
            height: 88,
            fill: '#F7F6ED',
          },
        },
        {
          type: 'rect',
          props: {
            x: 1205,
            y: 226,
            width: 28,
            height: 119.999,
            transform: 'rotate(-90 1205 226)',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            fill: '#F7F6ED',
            d: 'M1205 194C1216.56 194 1228 191.724 1238.68 187.301C1249.35 182.879 1259.05 176.397 1267.23 168.225C1275.4 160.054 1281.88 150.353 1286.3 139.676C1290.72 128.999 1293 117.556 1293 106L1205 106L1205 194Z',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M930 221.5V177.5C949.167 176.667 966.417 174.333 981.75 170.5C997.25 166.667 1010.92 161.25 1022.75 154.25C1034.75 147.25 1045 138.583 1053.5 128.25C1062.17 117.917 1069.25 105.833 1074.75 92C1080.25 78.1667 1084.33 62.5 1087 45L1131 49C1128 71.1667 1122.83 91.25 1115.5 109.25C1108.33 127.083 1099 142.833 1087.5 156.5C1076.17 170 1062.75 181.417 1047.25 190.75C1031.75 200.083 1014.25 207.333 994.75 212.5C975.25 217.667 953.667 220.667 930 221.5ZM1019 60.75L998.25 97C985.75 89.8333 973.25 83.1667 960.75 77C948.25 70.6667 935.667 64.75 923 59.25L940 21.5C953.333 27.1667 966.583 33.3333 979.75 40C992.917 46.5 1006 53.4167 1019 60.75Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',

          props: {
            d: 'M813.25 182.75L820.5 99.25L832.5 108.75H741.75V72H864L854.25 182.75H813.25ZM894 216.75H721.25V180H894V216.75Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M596 35.25L586 75.75C572 72.4167 558.083 69.5 544.25 67C530.583 64.3333 516.917 62.0833 503.25 60.25L509.25 19.25C523.583 21.0833 538 23.4167 552.5 26.25C567 28.9167 581.5 31.9167 596 35.25ZM583 94.75L573 135.25C559 131.917 545.083 129 531.25 126.5C517.583 123.833 503.917 121.583 490.25 119.75L496.25 78.75C510.583 80.5833 525 82.9167 539.5 85.75C554 88.4167 568.5 91.4167 583 94.75ZM502.5 229V185C521.667 185.167 539 183.833 554.5 181C570 178 583.667 173.417 595.5 167.25C607.333 161.083 617.5 153.25 626 143.75C634.5 134.25 641.417 123 646.75 110C652.083 97 655.833 82.1667 658 65.5L702 70.25C699.167 91.5833 694.167 110.75 687 127.75C680 144.75 670.833 159.667 659.5 172.5C648.333 185.167 635 195.75 619.5 204.25C604.167 212.583 586.75 218.833 567.25 223C547.75 227.167 526.167 229.167 502.5 229ZM656 53.75C652.667 45.0833 649.583 37.75 646.75 31.75C644.083 25.5833 641.333 19.8333 638.5 14.5L661.25 3.49999C664.917 10.3333 668.25 17.4167 671.25 24.75C674.417 31.9167 677.333 39 680 46L656 53.75ZM694.25 51C691.083 42.1667 688.083 34.6667 685.25 28.5C682.583 22.3333 679.917 16.6667 677.25 11.5L699.5 0.25C703.333 7.25 706.75 14.4167 709.75 21.75C712.75 28.9167 715.583 36 718.25 43L694.25 51Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M305.25 199.5L264.75 182C275.583 157 285.667 130.667 295 103C304.5 75.3333 313.167 46.4167 321 16.25L363.5 27.25C355.333 58.4167 346.417 88.5 336.75 117.5C327.083 146.333 316.583 173.667 305.25 199.5ZM421 152.5L435 192C417.333 197.833 398.25 202.667 377.75 206.5C357.25 210.167 335.917 213.083 313.75 215.25C291.583 217.417 269.083 219.25 246.25 220.75L243.75 179.25C271.417 177.417 296 175.333 317.5 173C339.167 170.5 358.417 167.583 375.25 164.25C392.25 160.917 407.5 157 421 152.5ZM470 208.5L429.5 226C421.333 206.667 412.833 187.583 404 168.75C395.333 149.75 385.75 130.917 375.25 112.25L413.75 90.75C424.75 110.417 434.833 130.167 444 150C453.167 169.667 461.833 189.167 470 208.5Z',
            fill: '#F7F6ED',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M11.25 89.5V50.5H218.75V89.5H11.25ZM94 226.5V15H141V226.5H94ZM41.75 211.5L0.75 195C7.08333 179.5 13.4167 164 19.75 148.5C26.0833 133 32.3333 117.5 38.5 102L79.5 118.5C73.3333 134 67.0833 149.5 60.75 165C54.4167 180.5 48.0833 196 41.75 211.5ZM187.5 211.75C181.333 195.917 175.25 180 169.25 164C163.25 148 157.167 132.083 151 116.25L192 100.75C198.167 116.583 204.25 132.5 210.25 148.5C216.25 164.5 222.333 180.417 228.5 196.25L187.5 211.75ZM176.25 55C172.917 46.3333 169.833 39 167 33C164.333 26.8333 161.583 21.0833 158.75 15.75L181.5 4.75001C185.167 11.5833 188.583 18.5833 191.75 25.75C195.083 32.75 198.083 39.75 200.75 46.75L176.25 55ZM213.5 52.25C210.333 43.4167 207.333 35.9167 204.5 29.75C201.833 23.5833 199.167 17.9167 196.5 12.75L218.75 1.5C222.583 8.5 226 15.6667 229 23C232 30.1667 234.833 37.25 237.5 44.25L213.5 52.25Z',
            fill: '#F7F6ED',
          },
        },
      ],
    },
  },
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
        background: '#F7F6ED',
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: `${defaultFontName}, ${fontName}`,
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 64,
                    flex: '1 1 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: 705,
                    lineHeight: '139.3%',
                    letterSpacing: '-2.88px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: '#121211',
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
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    flex: '0 0 160px',
                    display: 'flex',
                    padding: 42,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'relative',
                    backgroundColor: '#121211',
                  },
                  children: [name[post.data.locale]],
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
