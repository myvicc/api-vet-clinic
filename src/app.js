import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { doctorSchema } from './schemas/doctor.schema.js';
import {
  loginDoctorController,
  registerDoctorController,
} from './controllers/doctors.controller.js';

export const application = fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
});

application.register(fastifyMultipart, {
  addToBody: true,
});
application.register(fastifySwagger);
application.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

application.addSchema(doctorSchema);
application.register(
  (instance, opts, done) => {
    instance.post(
      '/doctor',
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
    instance.post(
      '/login',
      {
        schema: {
          tags: ['doctors'],
          descriptions: ['login a doctor'],
          body: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
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
  },
  {
    prefix: '/api/v1',
  }
);
