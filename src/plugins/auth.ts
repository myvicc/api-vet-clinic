import fastifyPlugin from 'fastify-plugin';
import { verifyAccessToken } from '../services/auth.service.js';
import { getDoctorById } from '../services/doctor.service.js';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { JwtPayload } from 'jsonwebtoken';
import pkg from 'jsonwebtoken';

const { JsonWebTokenError } = pkg;

const authPlugin: FastifyPluginCallback = (instance, opts, done) => {
  instance.decorate('user', {});
  instance.addHook(
    'preHandler',
    async (
      request: FastifyRequest<{
        Headers: { token: string };
        RouteConfig: { withAuth: string };
      }>,
      reply
    ) => {
      const {
        headers: { token },
        // @ts-ignore
        routeConfig: { withAuth },
      } = request;
      if (withAuth) {
        try {
          const { id } = (await verifyAccessToken(token)) as {
            id: string | JwtPayload;
          }; //?
          // @ts-ignore
          request.user = await getDoctorById(id);
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
