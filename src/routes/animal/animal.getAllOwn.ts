import { FastifyPluginCallback } from 'fastify';
import { getListOfOwnAnimalController } from '../../controllers/animal.controller';

export const getAllAnimalRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.get(
    '',
    {
      config: {
        withAuth: true,
        permission: ['user'],
      },
      schema: {
        tags: ['Animal'],
        description: 'Get all own animal',
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  $ref: 'animal#/properties/id',
                },
                name: {
                  $ref: 'animal#/properties/name',
                },
                breed: {
                  $ref: 'animal#/properties/breed',
                },
                age: {
                  $ref: 'animal#/properties/age',
                },
              },
            },
          },
        },
      },
    },
    getListOfOwnAnimalController
  );
  done();
};
