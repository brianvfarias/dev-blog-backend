import { serial, text, timestamp, pgTable, varchar } from 'drizzle-orm/pg-core';
export const articles = pgTable('articles', {
  id: serial('id'),
  title: varchar('title'),
  content: text('content'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  cover: text('cover'),
});
