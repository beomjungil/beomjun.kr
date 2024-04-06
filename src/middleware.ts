import type { APIContext, AstroGlobal, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { languageTag } from './paraglide/runtime';
import { SESSION_COOKIE_NAME } from './server/auth/constants';
import { configureAuthContainer } from './server/auth/dependencies/configureContainer';
import { configureCoreContainer } from './server/dependencies/configureContainer';

const authRequiredRoutes = ['/oauth/authorize', '/me'];

function redirectIfAuthRequired(context: APIContext, next: MiddlewareNext) {
  const pathname = context.url.pathname.replace('/en', '').replace('/ja', '');
  if (authRequiredRoutes.some((route) => pathname.startsWith(route))) {
    const redirectQuery = new URLSearchParams({
      redirect: encodeURIComponent(
        `${context.url.pathname}${context.url.search}`,
      ),
    });

    const languagePath = languageTag() === 'ko' ? '' : `/${languageTag()}`;
    return Response.redirect(
      context.url.protocol +
        '//' +
        context.url.host +
        languagePath +
        '/login?' +
        redirectQuery.toString(),
    );
  }
  return next();
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.locals.runtime) {
    return next();
  }

  const container = configureAuthContainer(
    configureCoreContainer({
      DB: context.locals.runtime.env.DB,
      env: context.locals.runtime.env,
    }),
  );
  const lucia = container.resolve('lucia');
  const sessionId = context.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionId) {
    context.locals.user = null;
    context.locals.session = null;
    return redirectIfAuthRequired(context, next);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirectIfAuthRequired(context, next);
  }

  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  context.locals.session = session;
  context.locals.user = user as unknown as AstroGlobal['locals']['user'];
  return next();
});
