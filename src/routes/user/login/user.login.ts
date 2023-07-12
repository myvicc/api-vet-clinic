import { loginUserController } from '../../../controllers/users.controller';
import { checkUserPasswordGuard } from './checkUserPasswordGuard';
import { isUserNotExistsGuard } from './isUserNotExistsGuard';
import { FastifyPluginCallback } from 'fastify';
import { UserType } from '../../../types/User.type';

export const loginUserRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Body: Pick<UserType, 'email'>;
  }>('preHandler', isUserNotExistsGuard);
  server.addHook<{
    Body: Pick<UserType, 'email' | 'password'>;
  }>('preHandler', checkUserPasswordGuard);
  server.post<{
    Body: { email: string };
  }>(
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
