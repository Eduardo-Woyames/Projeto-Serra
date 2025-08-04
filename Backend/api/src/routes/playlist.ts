import { FastifyInstance } from 'fastify';
import { playlistController } from '../controllers/playlistController';

export async function playlistRoutes(app: FastifyInstance) {
  await playlistController(app);
}
