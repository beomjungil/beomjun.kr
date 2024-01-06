import { useAstroI18n } from 'astro-i18n';
import { sequence } from 'astro/middleware';

import type { MiddlewareHandler } from 'astro';

const astroI18n = useAstroI18n();

export const onRequest: MiddlewareHandler = (context, next) => {
  if (context.request.url.includes('og.png')) {
    return next();
  }

  return sequence(astroI18n)(context, next);
};

// export function onRequest({ locals, request }, next) {
//   // intercept data from a request
//   // optionally, modify the properties in `locals`
//   locals.title = 'New title';

//   // return a Response or the result of calling `next()`
//   return next();
// }
