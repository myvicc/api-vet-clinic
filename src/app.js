import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { signupDoctors } from './services/auth.service.js';
import { loginDoctor } from './services/login.service.js';

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

application.register(
  (instance, opts, done) => {
    instance.post(
      '/doctor',
      {
        schema: {
          tags: ['doctors'],
          descriptions: ['create a doctor'],
          body: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
                minLength: 3,
                maxLength: 25,
              },
              lastName: {
                type: 'string',
                minLength: 3,
                maxLength: 25,
              },
              email: {
                type: 'string',
                minLength: 8,
                maxLength: 40,
                format: 'email',
              },
              password: {
                type: 'string',
                minLength: 8,
                maxLength: 40,
              },
            },
            required: ['firstName', 'lastName', 'email', 'password'],
          },
          response: {
            200: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                },
                firstName: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 25,
                },
                lastName: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 25,
                },
                email: {
                  type: 'string',
                  minLength: 8,
                  maxLength: 40,
                  format: 'email',
                },
              },
            },
          },
        },
      },
      async (request, reply) => {
        await signupDoctors(request.body);
        reply.send('something)');
      }
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
            200: {
              type: 'string',
            },
          },
        },
      },
      async (request, reply) => {
        await loginDoctor(request.body);
      }
    );
    done();
  },
  {
    prefix: '/api/v1',
  }
);
