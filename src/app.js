import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  loginDoctorController,
  registerDoctorController,
} from './controllers/doctors.controller.js';
import {
  loginUserController,
  registerUsersController,
} from './controllers/users.controller.js';
import { schemas } from './schemas/index.js';

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

schemas.forEach((schema) => {
  application.addSchema(schema);
});

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
    instance.post(
      '/user',
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
    instance.post(
      '/login-user',
      {
        schema: {
          tags: ['user'],
          description: ['login user'],
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
  },
  {
    prefix: '/api/v1',
  }
);
