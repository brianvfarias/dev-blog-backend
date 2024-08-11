import fastify from 'fastify';
import cors from '@fastify/cors';
import { db } from './db.ts';
import { articles } from './schema.ts';

const server = fastify();
await server.register(cors, {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
});

server.get('/articles', async (req, res) => {
  console.log('getting articles');
  const articles = await db.query.articles.findMany();
  res.send(articles);
});

server.post('/articles', async (req, res) => {
  // const { title, content } = req.body;
  console.log(req.body);
  const creation = await db.insert(articles).values(req.body).returning();
  console.log(creation);
  res.send({ message: 'success' });
});

server.listen({ port: 8888 }, () => {
  console.log('running on 8888');
});
