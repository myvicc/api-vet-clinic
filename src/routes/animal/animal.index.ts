import { FastifyPluginCallback } from 'fastify';
import { createAnimalRoute } from './animal.create';
import { updateAnimalRoute } from './animal.update';
import { deleteAnimalRoute } from './animal.delete';

export const animalRoutes: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.register(createAnimalRoute, { prefix: '/' });
  server.register(updateAnimalRoute, { prefix: '/:id' });
  server.register(deleteAnimalRoute, { prefix: '/:id' });
  done();
};
