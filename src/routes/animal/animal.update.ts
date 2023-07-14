import { updateAnimalController } from '../../controllers/animal.controller';
import { FastifyPluginCallback } from 'fastify';
import { isAnimalNotExistByIdGuard } from './guards/isAnimalNotExistById';
import { AnimalType } from '../../types/Animal.type';

export const updateAnimalRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Params: Pick<AnimalType, 'id'>;
    Body: Omit<AnimalType, 'id' | 'ownerId'>;
  }>('preHandler', isAnimalNotExistByIdGuard);
  server.put<{
    Body: Omit<AnimalType, 'id' | 'ownerId'>;
    Params: Pick<AnimalType, 'id'>;
  }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['user'],
      },
      schema: {
        tags: ['Animal'],
        description: 'Update animal',
        params: {
          type: 'object',
          properties: {
            id: {
              $ref: 'animal#/properties/id',
            },
          },
          required: ['id'],
        },
        body: {
          $ref: 'animal',
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
    updateAnimalController
  );
  done();
};
