import { FastifyPluginCallback } from 'fastify';
import { createAnimalRoute } from './animal.create';
import { updateAnimalRoute } from './animal.update';
import { deleteAnimalRoute } from './animal.delete';
import { getAllAnimalRoute } from './animal.getAllOwn';
import { getOneAnimalRoute } from './animal.getOneOwn';

export const animalRoutes: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.register(createAnimalRoute, { prefix: '/' });
  server.register(updateAnimalRoute, { prefix: '/:id' });
  server.register(deleteAnimalRoute, { prefix: '/:id' });
  server.register(getAllAnimalRoute, { prefix: '/' });
  server.register(getOneAnimalRoute, { prefix: '/:id' });
  done();
};
