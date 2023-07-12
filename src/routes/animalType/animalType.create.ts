import { createAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeExistsGuard } from './guards/isAnimalTypeExists';
import { FastifyPluginCallback } from 'fastify';
import { AnimalTypeType } from '../../types/AnimalType.type';

export const createAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Body: Pick<AnimalTypeType, 'type'>;
  }>('preHandler', isAnimalTypeExistsGuard);
  server.post<{
    Body: Pick<AnimalTypeType, 'type'>;
  }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['doctor'],
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
