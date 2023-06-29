import { deleteAnimalTypeController } from '../../controllers/animalType.controller.js';
import { isAnimalTypeNotExistByIdGuard } from '../../guards/isAnimalTypeNotExistById.js';

export const deleteAT = async (server, opts, done) => {
  server.addHook('preHandler', isAnimalTypeNotExistByIdGuard);
  server.delete(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['Animal type'],
        description: 'Delete animal type',
        params: {
          type: 'object',
          properties: {
            animalTypeId: {
              type: 'string',
            },
          },
          required: ['animalTypeId'],
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
    deleteAnimalTypeController
  );
  done();
};
