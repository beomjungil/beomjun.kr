import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const applications = sqliteTable('applications', {
  id: text('id').unique().notNull().primaryKey(),
  secret: text('secret').notNull(),
  name: text('name').unique().notNull(),
  redirectUris: text('redirect_uris').notNull(),
  website: text('website').notNull(),
  scopes: text('scopes').notNull(),
  createdAt: integer('created_at', {
    mode: 'timestamp_ms',
  })
    .notNull()
    .$defaultFn(() => new Date()),
});
