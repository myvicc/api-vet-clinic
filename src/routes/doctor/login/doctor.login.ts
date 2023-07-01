import { loginDoctorController } from '../../../controllers/doctors.controller';
import { checkDoctorPasswordGuard } from './checkDoctorPasswordGuard';
import { isDoctorNotExistsGuard } from './isDoctorNotExistsGuard';
import { FastifyPluginCallback } from 'fastify';

export const loginDoctorRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isDoctorNotExistsGuard);
  server.addHook('preHandler', checkDoctorPasswordGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['doctors'],
        description: 'login a doctor',
        body: {
          type: 'object',
          properties: {
            email: {
              $ref: 'doctor#/properties/email',
            },
            password: {
              $ref: 'doctor#/properties/password',
            },
          },
          required: ['email', 'password'],
        },
        response: {
          400: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
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
    loginDoctorController
  );
  done();
};
