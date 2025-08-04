import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function playlistController(app: FastifyInstance) {
  app.addHook('onRequest', async (req) => {
    await req.jwtVerify();
  });

  app.post('/playlist', async (req, res) => {
    const schema = z.object({
      title: z.string().min(1),
    });

    const { title } = schema.parse(req.body);

    const playlist = await prisma.playlist.create({
      data: {
        title,
        userId: Number(req.user.sub),
      },
    });

    return res.status(201).send(playlist);
  });

  app.get('/playlist', async (req) => {
    const playlists = await prisma.playlist.findMany({
      where: { userId: req.user.id },
      include: { songs: true },
    });
    return playlists;
  });

  app.post('/playlist/:id/songs', async (req, res) => {
    const params = z.object({ id: z.coerce.number() });
    const body = z.object({
      deezerId: z.string(),
      title: z.string(),
      artist: z.string(),
    });

    const { id } = params.parse(req.params);
    const { deezerId, title, artist } = body.parse(req.body);

    const song = await prisma.song.create({
      data: {
        playlistId: id,
        deezerId,
        title,
        artist,
      },
    });

    return res.status(201).send(song);
  });
}
