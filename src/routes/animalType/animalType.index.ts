import { createAnimalTypeRoute } from './animalType.create';
import { updateAnimalTypeRoute } from './animalType.update';
import { deleteAnimalTypeRoute } from './animalType.delete';
import { getOneAnimalTypeRoute } from './animalType.getOne';
import { getAnimalTypeRoute } from './animalType.getAll';
import { FastifyPluginCallback } from 'fastify';

export const animalTypeRoutes: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.register(createAnimalTypeRoute, { prefix: '/' });
  server.register(updateAnimalTypeRoute, { prefix: '/:id' });
  server.register(deleteAnimalTypeRoute, { prefix: '/:id' });
  server.register(getAnimalTypeRoute, { prefix: '/' });
  server.register(getOneAnimalTypeRoute, { prefix: '/:id' });
  done();
};
