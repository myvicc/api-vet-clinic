import { registerDoctorController } from '../../controllers/doctors.controller.js';
import { isDoctorExistsGuard } from '../../guards/isDoctorExists.js';

export const registerDoctor = async (server, opts, done) => {
  server.addHook('preHandler', isDoctorExistsGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['doctors'],
        descriptions: ['create a doctor'],
        body: {
          $ref: 'doctor',
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
    registerDoctorController
  );
  done();
};
