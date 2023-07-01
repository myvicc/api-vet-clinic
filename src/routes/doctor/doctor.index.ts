import { registerDoctorRoute } from './register/doctor.register';
import { loginDoctorRoute } from './login/doctor.login';
import { FastifyPluginCallback } from 'fastify';

export const doctorRoutes: FastifyPluginCallback = async (
  server,
  opts,
  done
) => {
  server.register(registerDoctorRoute, { prefix: '/register' });
  server.register(loginDoctorRoute, { prefix: '/login' });
  done();
};
