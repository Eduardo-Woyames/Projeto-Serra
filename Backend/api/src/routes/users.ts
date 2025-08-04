import { FastifyInstance } from 'fastify';
import { usersController } from '../controllers/usersController';

export async function usersRoutes(app: FastifyInstance) {
  await usersController(app);
}
