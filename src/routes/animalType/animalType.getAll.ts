import { getListOfAnimalTypeController } from '../../controllers/animalType.controller';
import { FastifyPluginCallback } from 'fastify';

export const getAnimalTypeRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.get(
    '',
    {
      config: {
        withAuth: true,
      },
      schema: {
        tags: ['Animal type'],
        description: 'List of animal type',
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  $ref: 'animalType#/properties/type',
                },
                id: {
                  $ref: 'animalType#/properties/id',
                },
              },
            },
          },
        },
      },
    },
    getListOfAnimalTypeController
  );
  done();
};
