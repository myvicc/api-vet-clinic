import { FastifyPluginCallback } from 'fastify';
import { getOneAnimalController } from '../../controllers/animal.controller';
import { isAnimalNotExistByIdGuard } from './guards/isAnimalNotExistById';
import { AnimalType } from '../../types/Animal.type';

export const getOneAnimalRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isAnimalNotExistByIdGuard);
  server.get<{
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
        description: 'Get one own animal',
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
              name: {
                $ref: 'animal#/properties/name',
              },
              age: {
                $ref: 'animal#/properties/age',
              },
              breed: {
                $ref: 'animal#/properties/breed',
              },
              animalType: {
                $ref: 'animal#/properties/animalType',
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
    getOneAnimalController
  );
  done();
};
