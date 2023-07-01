import { loginUserController } from '../../../controllers/users.controller';
import { checkUserPasswordGuard } from './checkUserPasswordGuard';
import { isUserNotExistsGuard } from './isUserNotExistsGuard';
import { FastifyPluginCallback } from 'fastify';

export const loginUserRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isUserNotExistsGuard);
  server.addHook('preHandler', checkUserPasswordGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['user'],
        description: 'login user',
        body: {
          type: 'object',
          properties: {
            email: {
              $ref: 'user#/properties/email',
            },
            password: {
              $ref: 'user#/properties/password',
            },
          },
          required: ['email', 'password'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              accessToken: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    loginUserController
  );
  done();
};
