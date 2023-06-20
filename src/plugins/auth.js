import fastifyPlugin from 'fastify-plugin';
import { verifyAccessToken } from '../services/auth.service.js';
import { getDoctorById } from '../services/doctor.service.js';

const authPlugin = (instance, opts, done) => {
  instance.decorate('user', {});
  instance.addHook('preHandler', async (request, reply) => {
    const {
      headers: { token },
      routeConfig: { withAuth },
    } = request;
    if (withAuth) {
      try {
        const { id } = await verifyAccessToken(token);
        request.user = await getDoctorById(id);
      } catch (err) {
        reply.status(401);
        reply.send({ message: 'Unauthorized', reason: err.message });
      }
    }
  });
  done();
};
export default fastifyPlugin(authPlugin);
