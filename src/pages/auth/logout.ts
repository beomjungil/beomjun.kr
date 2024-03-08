import { APIRoute } from '@/server/api-route';
import { logout } from '@/server/auth/dependencies';

export const prerender = false;

export const GET = APIRoute('/auth/logout', ({ cookies, redirect }) => {
  return logout({ cookies }).map(() => {
    return redirect('/login');
  });
});

export const POST = APIRoute('/auth/logout', ({ cookies, redirect }) => {
  return logout({ cookies }).map(() => {
    return redirect('/login');
  });
});
