import { registerDoctor } from './doctor.register.js';
import { loginDoctor } from './doctor.login.js';

export const doctorRoutes = async (server, opts, done) => {
  server.register(registerDoctor, { prefix: '/register' });
  server.register(loginDoctor, { prefix: '/login' });
  done();
};
