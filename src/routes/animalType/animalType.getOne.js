import { getOneOfAnimalTypeController } from '../../controllers/animalType.controller.js';
import { isAnimalTypeNotExistByIdGuard } from '../../guards/isAnimalTypeNotExistById.js';

export const getOneAT = async (server, opts, done) => {
  server.addHook('preHandler', isAnimalTypeNotExistByIdGuard);
  server.get(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['Animal type'],
        description: ['One animal type'],
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
              typeOfAnimal: {
                type: 'object',
                properties: {
                  typeOfAnimal: {
                    $ref: 'animalType#/properties/typeOfAnimal',
                  },
                },
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
    getOneOfAnimalTypeController
  );
  done();
};
