import { createAT } from './animalType.create.js';
import { updateAT } from './animalType.update.js';
import { deleteAT } from './animalType.delete.js';
import { getOneAT } from './animalType.getOne.js';
import { getAT } from './animalType.getAll.js';

export const animalTypeRoutes = async (server, opts, done) => {
  server.register(createAT, { prefix: '/' });
  server.register(updateAT, { prefix: '/:animalTypeId' });
  server.register(deleteAT, { prefix: '/:animalTypeId' });
  server.register(getAT, { prefix: '/' });
  server.register(getOneAT, { prefix: '/:animalTypeId' });
  done();
};
