import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

import { usersRoutes } from './routes/users';
import { playlistRoutes } from './routes/playlist';
import { songsRoutes } from './routes/songs';
import { METHODS } from 'http';

dotenv.config();

const app = fastify();

app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.register(cors, {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

})

app.register(usersRoutes);
app.register(playlistRoutes);
app.register(songsRoutes);
app.get('/', () => {
  return 'Hello World!'
})
app.listen({ port: 3333 }, () => {
  console.log('Servidor rodando em http://localhost:3333');
});
