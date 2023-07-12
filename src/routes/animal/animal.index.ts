import { FastifyPluginCallback } from 'fastify';
import { createAnimalRoute } from './animal.create';

export const animalRoutes: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.register(createAnimalRoute, { prefix: '/' });
  done();
};
