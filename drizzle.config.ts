import type { Config } from 'drizzle-kit';

const { LOCAL_DB_PATH, WRANGLER_CONFIG, DB_NAME = 'beomjun-kr' } = process.env;

export default LOCAL_DB_PATH
  ? ({
      schema: './src/server/database/tables',
      driver: 'better-sqlite',
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: './src/server/database/tables',
      out: './migrations',
      driver: 'd1',
      dbCredentials: {
        wranglerConfigPath:
          new URL('wrangler.toml', import.meta.url).pathname +
          (WRANGLER_CONFIG ?? '')
            ? ` ${WRANGLER_CONFIG}`
            : '',
        dbName: DB_NAME,
      },
    } satisfies Config);
