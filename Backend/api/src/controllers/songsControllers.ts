import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import fetch from 'node-fetch';

interface DeezerSearchResponse {
  data: any[]; 
  total: number;
  next?: string;
}

export async function songsController(app: FastifyInstance) {
  app.get('/songs/search', async (req, res) => {
    const query = z.object({ title: z.string().min(1) });
    const { title } = query.parse(req.query);

    const url = `https://api.deezer.com/search?q=${encodeURIComponent(title)}`;
    const response = await fetch(url);
    const data = (await response.json()) as DeezerSearchResponse;

    if (!data || !data.data) {
      return res.status(500).send({ error: 'Erro ao buscar músicas' });
    }

    const result = data.data.map((song: any) => ({
      deezerId: String(song.id),
      title: song.title,
      artist: song.artist.name,
    }));

    return res.send(result);
  });
}
