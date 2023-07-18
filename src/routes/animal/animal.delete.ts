import { FastifyPluginCallback } from 'fastify';
import { deleteAnimalController } from '../../controllers/animal.controller';
import { isAnimalNotExistByIdGuard } from './guards/isAnimalNotExistById';
import { AnimalType } from '../../types/Animal.type';

export const deleteAnimalRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{ Params: Pick<AnimalType, 'id'> }>(
    'preHandler',
    isAnimalNotExistByIdGuard
  );
  server.delete<{ Params: Pick<AnimalType, 'id'> }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['user'],
      },
      schema: {
        tags: ['Animal'],
        description: 'Delete animal',
        params: {
          type: 'object',
          properties: {
            id: {
              $ref: 'animal#/properties/id',
            },
          },
          required: ['id'],
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
    deleteAnimalController
  );
  done();
};
