import { RouteHandler } from 'fastify';
import { loginUser, signUpUser } from '../services/user.service.js';

export const registerUsersController: RouteHandler<{
  Body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}> = async (request, reply) => {
  const { firstName, lastName, email, password } = request.body;
  await signUpUser({ firstName, lastName, email, password });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginUserController: RouteHandler<{
  Body: { email: string };
}> = async (request, reply) => {
  const { email } = request.body;
  reply.status(200);
  return { accessToken: await loginUser(email) };
};
