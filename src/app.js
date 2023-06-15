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
import {
  createAnimalTypeController,
  deleteAnimalTypeController,
  getListOfAnimalTypeController,
  getOneOfAnimalTypeController,
  updateAnimalTypeController,
} from './controllers/animalType.controller.js';

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
    instance.post(
      '/animal-type',
      {
        schema: {
          tags: ['animal-type'],
          description: ['Create animal type'],
          body: {
            $ref: 'animalType',
            required: ['typeOfAnimal'],
          },
          response: {
            200: {
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
      createAnimalTypeController
    );
    instance.put(
      '/animal-type/:animalTypeId',
      {
        schema: {
          tags: ['Animal type'],
          description: ['Update animal type'],
          params: {
            type: 'object',
            properties: {
              animalTypeId: {
                type: 'string',
              },
            },
            required: ['animalTypeId'],
          },
          body: {
            $ref: 'animalType',
          },
          response: {
            200: {
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
      updateAnimalTypeController
    );
    instance.delete(
      '/animal-type/:animalTypeId',
      {
        schema: {
          tags: ['Animal type'],
          description: ['Delete animal type'],
          params: {
            type: 'object',
            properties: {
              animalTypeId: {
                type: 'string',
              },
            },
            required: ['animalTypeId'],
          },
          response: {
            200: {
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
      deleteAnimalTypeController
    );
    instance.get(
      '/animal-type',
      {
        schema: {
          tags: ['Animal type'],
          description: ['List of animal type'],
          response: {
            200: {
              type: 'array',
              items: {
                $ref: 'animalType',
              },
            },
          },
        },
      },
      getListOfAnimalTypeController
    );
    instance.get(
      '/animal-type/:animalTypeId',
      {
        schema: {
          tags: ['Animal type'],
          description: ['One animal type'],
          params: {
            type: 'object',
            properties: {
              animalTypeId: {
                type: 'string',
              },
            },
            required: ['animalTypeId'],
          },
          response: {
            200: {
              type: 'object',
              properties: {
                typeOfAnimal: {
                  type: 'object',
                  properties: {
                    typeOfAnimal: {
                      $ref: 'animalType#/properties/typeOfAnimal',
                    },
                  },
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
      getOneOfAnimalTypeController
    );
    done();
  },
  {
    prefix: '/api/v1',
  }
);
