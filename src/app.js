import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { schemas } from './schemas/index.js';
import authPlugin from './plugins/auth.js';
import { doctorRoutes } from './routes/doctor/doctor.index.js';
import { userRoutes } from './routes/user/user.index.js';
import { animalTypeRoutes } from './routes/animalType/animalType.index.js';

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

application.register(authPlugin);
application.register(
  (instance, opts, done) => {
    instance.register(doctorRoutes, { prefix: '/doctor' });
    instance.register(userRoutes, { prefix: '/user' });
    instance.register(animalTypeRoutes, { prefix: '/animalType' });
    done();
  },
  {
    prefix: '/api/v1',
  }
);
