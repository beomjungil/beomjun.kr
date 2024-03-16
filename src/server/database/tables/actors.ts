import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const actors = sqliteTable('actors', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .primaryKey(),
  type: text('type')
    .$type<'Person' | 'Service' | 'Application' | 'Group' | 'Organization'>()
    .notNull(),
  domain: text('domain').notNull(),
  publicKey: text('public_key').notNull(),
  privateKey: text('private_key').notNull(),
  createdAt: integer('created_at', {
    mode: 'timestamp_ms',
  })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', {
    mode: 'timestamp_ms',
  })
    .notNull()
    .$defaultFn(() => new Date()),
});
