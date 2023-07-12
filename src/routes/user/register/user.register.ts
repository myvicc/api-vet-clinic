import { registerUsersController } from '../../../controllers/users.controller';
import { isUserExistsGuard } from './isUserExistsGuard.js';
import { FastifyPluginCallback } from 'fastify';
import { UserType } from '../../../types/User.type';

export const registerUserRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Body: Pick<UserType, 'email'>;
  }>('preHandler', isUserExistsGuard);
  server.post<{
    Body: Pick<UserType, 'firstName' | 'lastName' | 'email' | 'password'>;
  }>(
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
