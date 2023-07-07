import { deleteAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeNotExistByIdGuard } from './guards/isAnimalTypeNotExistById';
import { FastifyPluginCallback } from 'fastify';
import { AnimalTypeType } from '../../types/AnimalType.type';

export const deleteAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Params: Pick<AnimalTypeType, 'id'>;
  }>('preHandler', isAnimalTypeNotExistByIdGuard);
  server.delete<{
    Params: Pick<AnimalTypeType, 'id'>;
  }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['doctor'],
      },
      schema: {
        tags: ['Animal type'],
        description: 'Delete animal type',
        params: {
          type: 'object',
          properties: {
            id: {
              $ref: 'animalType#/properties/id',
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
    deleteAnimalTypeController
  );
  done();
};
