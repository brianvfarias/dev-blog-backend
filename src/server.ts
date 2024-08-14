import fastify from 'fastify';
import cors from '@fastify/cors';
import { db } from './db.ts';
import { articles } from './schema.ts';
import { env } from './env/index.ts';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { format } from 'path';

const server = fastify();
await server.register(cors, {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
});

server.get('/articles', async (req, res) => {
  const articles = await db.query.articles.findMany();
  res.send(articles);
});

server.post('/articles', async (req, res) => {
  const bodySchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    cover: z.string(),
  });
  const newArticle = bodySchema.parse(req.body);
  const creation = await db
    .insert(articles)
    .values(newArticle)
    .returning({ insertedId: articles.id });
  console.log(creation);
  res.send({ message: 'success' });
});

server.delete('/articles/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().min(1),
  });
  const { id } = paramsSchema.parse(req.params);
  const deleted = await db
    .delete(articles)
    .where(eq(articles.id, id))
    .returning({ titleDeleted: articles.title });
  if (deleted.length > 0) return res.send(deleted);
  return res.status(400).send('Article not found!');
});

server.put('/articles/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().min(1),
  });
  const { id } = paramsSchema.parse(req.params);
  const bodySchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    cover: z.string().optional(),
  });

  const updatedArticle = bodySchema.parse(req.body);

  const update = await db
    .update(articles)
    .set({ ...updatedArticle })
    .where(eq(articles.id, id))
    .returning({ updatedArticle: articles.id });

  res.send(update);
});

server.get('/articles/:id', async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().min(1),
  });

  const { id } = paramsSchema.parse(req.params);
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));
  res.send(article);
});

server.listen({ port: env.PORT }, () => {
  console.log('running on 8888');
});
