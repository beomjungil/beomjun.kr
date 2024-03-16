import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').unique().notNull().primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email'),
  hashedPassword: text('hashed_password'),
  headerImageUrl: text('header_image_url'),
  profileImageUrl: text('profile_image_url'),
  summary: text('summary'),
  fullName: text('full_name'),
});
