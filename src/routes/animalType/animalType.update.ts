import { updateAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeNotExistByIdGuard } from './guards/isAnimalTypeNotExistById';
import { FastifyPluginCallback } from 'fastify';

export const updateAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
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
            id: {
              $ref: 'animalType#/properties/id',
            },
          },
          required: ['id'],
        },
        body: {
          $ref: 'animalType',
          required: ['type'],
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
