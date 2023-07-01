import { deleteAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeNotExistByIdGuard } from './guards/isAnimalTypeNotExistById';
import { FastifyPluginCallback } from 'fastify';

export const deleteAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
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
