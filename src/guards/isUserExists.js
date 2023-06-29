import { isUserExist } from '../services/user.service.ts';

export const isUserExistsGuard = async (request, reply) => {
  if (await isUserExist(request.body.email)) {
    reply.status(400);
    reply.send({ message: 'User with such email already exists' });
  }
};
