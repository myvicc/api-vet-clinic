import { createAnimalController } from '../../controllers/animal.controller';
import { FastifyPluginCallback } from 'fastify';
import { isAnimalExistGuard } from './guards/isAnimalExist';
import { AnimalType } from '../../types/Animal.type';

export const createAnimalRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Body: Pick<AnimalType, 'name'>;
  }>('preHandler', isAnimalExistGuard);
  server.post<{
    Body: Omit<AnimalType, 'id' | 'ownerId'>;
  }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['user'],
      },
      schema: {
        tags: ['Animal'],
        description: 'Create animal',
        body: {
          $ref: 'animal',
          required: ['name'],
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
    createAnimalController
  );
  done();
};
