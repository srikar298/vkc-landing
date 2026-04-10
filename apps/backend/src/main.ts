import Fastify from 'fastify';
import { db } from '@vishwakarma-k-c/db';
import { logger, config } from '@vishwakarma-k-c/shared';

const server = Fastify({
  logger: true,
});

server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    await server.listen({ port: config.PORT as number, host: '0.0.0.0' });
    console.log(`Backend Modular Monolith running on http://localhost:${config.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
