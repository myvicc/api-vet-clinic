import { registerUser } from './user.register.js';
import { loginUser } from './user.login.js';

export const userRoutes = async (server, opts, done) => {
  server.register(registerUser, { prefix: '/register' });
  server.register(loginUser, { prefix: '/login' });

  done();
};
