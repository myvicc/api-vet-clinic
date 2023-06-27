import { loginDoctorController } from '../../controllers/doctors.controller.js';
import { checkDoctorPasswordGuard } from '../../guards/checkDoctorPassword.js';
import { isDoctorNotExistsGuard } from '../../guards/isDoctorNotExists.js';

export const loginDoctor = async (server, opts, done) => {
  server.addHook('preHandler', isDoctorNotExistsGuard);
  server.addHook('preHandler', checkDoctorPasswordGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['doctors'],
        descriptions: ['login a doctor'],
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
