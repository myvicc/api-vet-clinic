import {
  checkUserPassword,
  isUserExist,
  loginUser,
  signUpUser,
} from '../services/user.service.js';

export const registerUsersController = async (request, reply) => {
  const { firstName, lastName, email, password } = request.body;
  if (await isUserExist(email)) {
    reply.status(400);
    return { message: 'User with such email already exists' };
  }
  await signUpUser({ firstName, lastName, email, password });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginUserController = async (request, reply) => {
  const { email, password } = request.body;
  if (!(await isUserExist(email))) {
    reply.status(400);
    return { message: 'User with such email does not exist' };
  }
  if (!(await checkUserPassword(email, password))) {
    reply.status(400);
    return { message: 'User with such email does not exist' };
  }
  reply.status(200);
  return { accessToken: await loginUser(email) };
};
