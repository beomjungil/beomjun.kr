import type { Database } from '@/server/database/drizzle';
import { sessions } from '@/server/database/tables/sessions';
import { users } from '@/server/database/tables/users';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import type { UsersTable } from '../../database/db';
import { SESSION_COOKIE_NAME } from '../constants';

export function initializeLucia(database: Database) {
  const adapter = new DrizzleSQLiteAdapter(database, sessions, users);

  return new Lucia(adapter, {
    sessionCookie: {
      name: SESSION_COOKIE_NAME,
      attributes: {
        secure: import.meta.env.PROD,
      },
    },
    getUserAttributes: (attributes) => {
      return {
        id: attributes.id,
        username: attributes.username,
        email: attributes.email,
      };
    },
  });
}

export type LuciaInstance = ReturnType<typeof initializeLucia>;

declare module 'lucia' {
  interface Register {
    Auth: LuciaInstance;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }

  type DatabaseUserAttributes = UsersTable;
}
