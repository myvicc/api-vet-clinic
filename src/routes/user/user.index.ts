import { registerUserRoute } from './register/user.register';
import { loginUserRoute } from './login/user.login';
import { FastifyPluginCallback } from 'fastify';

export const userRoutes: FastifyPluginCallback = async (server, opts, done) => {
  server.register(registerUserRoute, { prefix: '/register' });
  server.register(loginUserRoute, { prefix: '/login' });

  done();
};
