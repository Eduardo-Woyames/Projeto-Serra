//
// COPIE E COLE ESTE CÓDIGO COMPLETO DENTRO DE: src/@types/fastify-jwt.d.ts
//

import { FastifyRequest, FastifyReply } from 'fastify';

// Esta linha é importante para que a "mágica" dos tipos funcione
import '@fastify/jwt';

// Módulo para adicionar seu decorador `authenticate` ao Fastify
declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Módulo para definir os tipos do SEU TOKEN
declare module '@fastify/jwt' {
  interface FastifyJWT {
    /**
     * PAYLOAD: Este é o objeto que você passa para a função app.jwt.sign().
     * Ele precisa ter exatamente as propriedades que você usa para criar o token.
     */
    payload: {
      id: number;
      email: string;
    };

    /**
     * USER: Este é o objeto que fica disponível em req.user após a verificação.
     * Geralmente tem as mesmas informações do payload.
     */
    user: {
      id: number;
      email: string;
    };
  }
}