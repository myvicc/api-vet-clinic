import { registerDoctorController } from '../../../controllers/doctors.controller';
import { isDoctorExistsGuard } from './isDoctorExistsGuard';
import { FastifyPluginCallback } from 'fastify';

export const registerDoctorRoute: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.addHook('preHandler', isDoctorExistsGuard);
  server.post(
    '',
    {
      schema: {
        tags: ['doctors'],
        description: 'create a doctor',
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
