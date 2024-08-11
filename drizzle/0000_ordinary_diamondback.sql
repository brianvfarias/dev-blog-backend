CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial NOT NULL,
	"title" varchar,
	"content" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
