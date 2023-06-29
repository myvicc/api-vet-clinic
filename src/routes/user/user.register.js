import { registerUsersController } from '../../controllers/users.controller.js';
import { isUserExistsGuard } from '../../guards/isUserExists.js';

export const registerUser = async (server, opts, done) => {
  console.log('into user.register');
  server.addHook('preHandler', isUserExistsGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['user'],
        description: ['create a user'],
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
