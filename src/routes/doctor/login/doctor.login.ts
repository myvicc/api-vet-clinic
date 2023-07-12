import { loginDoctorController } from '../../../controllers/doctors.controller';
import { checkDoctorPasswordGuard } from './checkDoctorPasswordGuard';
import { isDoctorNotExistsGuard } from './isDoctorNotExistsGuard';
import { FastifyPluginCallback } from 'fastify';
import { UserType } from '../../../types/User.type';
import { DoctorType } from '../../../types/doctor.type';

export const loginDoctorRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook<{
    Body: Pick<UserType, 'email'>;
  }>('preHandler', isDoctorNotExistsGuard);
  server.addHook<{
    Body: Pick<UserType, 'email' | 'password'>;
  }>('preHandler', checkDoctorPasswordGuard);
  server.post<{
    Body: Pick<DoctorType, 'email'>;
  }>(
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
