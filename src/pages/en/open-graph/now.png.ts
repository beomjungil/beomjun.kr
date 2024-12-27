import { nowOpenGraph } from '@/pages/open-graph/now.png';

export async function GET() {
  return nowOpenGraph('en');
}
