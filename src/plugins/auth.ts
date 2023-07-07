import fastifyPlugin from 'fastify-plugin';
import { verifyAccessToken } from '../services/auth.service.js';
import { getDoctorById } from '../services/doctor.service.js';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import pkg from 'jsonwebtoken';
import { getUserById } from '../services/user.service';

const { JsonWebTokenError } = pkg;

const authPlugin: FastifyPluginCallback = (instance, opts, done) => {
  instance.decorate('user', {});
  instance.decorate('permission', null);
  instance.addHook(
    'preHandler',
    async (
      request: FastifyRequest<{
        Headers: { token: string };
        RouteConfig: { withAuth: string; permission: string };
      }>,
      reply
    ) => {
      const {
        headers: { token },
        routeConfig: { withAuth, permission },
      } = request;
      if (withAuth) {
        try {
          const payload = await verifyAccessToken(token);
          if (
            typeof payload === 'object' &&
            payload.id &&
            typeof payload.id === 'string' &&
            payload.userType &&
            permission
          ) {
            let user;
            if (payload.userType === 'doctor') {
              user = await getDoctorById({ id: payload.id });
            }
            if (payload.userType === 'user') {
              user = await getUserById({ id: payload.id });
            }
            if (user) {
              request.user = user;
            }
            if (!permission.includes(payload.userType)) {
              reply.status(400).send('Not access');
            }
            request.permission = payload.userType;
          }
        } catch (err) {
          if (err instanceof JsonWebTokenError) {
            reply.status(401);
            reply.send({ message: 'Unauthorized', reason: err.message });
          }
          reply.status(500);
          reply.send({ message: 'Unauthorized', reason: 'Unknown error' });
        }
      }
    }
  );
  done();
};
export default fastifyPlugin(authPlugin);
