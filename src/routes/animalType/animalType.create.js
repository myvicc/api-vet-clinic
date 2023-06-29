import { createAnimalTypeController } from '../../controllers/animalType.controller.js';
import { isAnimalTypeExistsGuard } from '../../guards/isAnimalTypeExists.js';

export const createAT = async (server, opts, done) => {
  server.addHook('preHandler', isAnimalTypeExistsGuard);
  server.post(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['animalType'],
        description: ['Create animal type'],
        body: {
          $ref: 'animalType',
          required: ['typeOfAnimal'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
          400: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    createAnimalTypeController
  );
  done();
};
