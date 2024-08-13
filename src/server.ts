import fastify from 'fastify';
import cors from '@fastify/cors';
import { db } from './db.ts';
import { articles } from './schema.ts';
import { env } from './env/index.ts';
import { z } from 'zod';

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
  const { title, content, cover } = bodySchema.parse(req.body);
  const creation = await db
    .insert(articles)
    .values({ title, content, cover })
    .returning();
  console.log(creation[0].id);
  res.send({ message: 'success' });
});

server.listen({ port: env.PORT }, () => {
  console.log('running on 8888');
});
