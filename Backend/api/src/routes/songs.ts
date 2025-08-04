import { FastifyInstance } from 'fastify';
import { songsController } from '../controllers/songsControllers';

export async function songsRoutes(app: FastifyInstance) {
  await songsController(app);
}
