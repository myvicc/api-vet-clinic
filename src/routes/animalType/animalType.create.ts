import { createAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeExistsGuard } from './guards/isAnimalTypeExists';
import { FastifyPluginCallback } from 'fastify';

export const createAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isAnimalTypeExistsGuard);
  server.post(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['animalType'],
        description: 'Create animal type',
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
    createAnimalTypeController
  );
  done();
};
