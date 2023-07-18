import { getOneOfAnimalTypeController } from '../../controllers/animalType.controller';
import { isAnimalTypeNotExistByIdGuard } from './guards/isAnimalTypeNotExistById';
import { FastifyPluginCallback } from 'fastify';
import { AnimalTypeType } from '../../types/AnimalType.type';

export const getOneAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Params: Pick<AnimalTypeType, 'id'>;
  }>('preHandler', isAnimalTypeNotExistByIdGuard);
  server.get<{
    Params: Pick<AnimalTypeType, 'id'>;
  }>(
    '',
    {
      config: {
        withAuth: true,
        permission: ['doctor', 'user'],
      },
      schema: {
        tags: ['Animal type'],
        description: 'One animal type',
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
              type: {
                $ref: 'animalType#/properties/type',
              },
              _id: {
                $ref: 'animalType#/properties/id',
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
