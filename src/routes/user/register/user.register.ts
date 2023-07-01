import { registerUsersController } from '../../../controllers/users.controller';
import { isUserExistsGuard } from './isUserExistsGuard.js';
import { FastifyPluginCallback } from 'fastify';

export const registerUserRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isUserExistsGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['user'],
        description: 'Create a user',
        body: {
          $ref: 'user',
          required: ['firstName', 'lastName', 'email', 'password'],
        },
        response: {
          201: {
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
    registerUsersController
  );
  done();
};
