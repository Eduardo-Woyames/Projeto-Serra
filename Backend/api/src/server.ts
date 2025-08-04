import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';

import { usersRoutes } from './routes/users';
import { playlistRoutes } from './routes/playlist';
import { songsRoutes } from './routes/songs';

dotenv.config();

const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.register(usersRoutes);
app.register(playlistRoutes);
app.register(songsRoutes);
app.get('/', () => {
  return 'Hello World!'
})
app.listen({ port: 3333 }, () => {
  console.log('Servidor rodando em http://localhost:3333');
});
