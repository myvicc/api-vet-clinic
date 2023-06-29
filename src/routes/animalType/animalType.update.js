import { updateAnimalTypeController } from '../../controllers/animalType.controller.js';
import { isAnimalTypeNotExistByIdGuard } from '../../guards/isAnimalTypeNotExistById.js';

export const updateAT = async (server, opts, done) => {
  server.addHook('preHandler', isAnimalTypeNotExistByIdGuard);
  server.put(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['Animal type'],
        description: 'Update animal type',
        params: {
          type: 'object',
          properties: {
            animalTypeId: {
              type: 'string',
            },
          },
          required: ['animalTypeId'],
        },
        body: {
          $ref: 'animalType',
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
    updateAnimalTypeController
  );
  done();
};
