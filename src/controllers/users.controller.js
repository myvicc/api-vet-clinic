import {
  isUserExist,
  loginUser,
  signUpUser,
} from '../services/user.service.js';

export const registerUsersController = async (request, reply) => {
  const { firstName, lastName, email, password } = request.body;
  await signUpUser({ firstName, lastName, email, password });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginUserController = async (request, reply) => {
  const { email } = request.body;
  reply.status(200);
  return { accessToken: await loginUser(email) };
};
