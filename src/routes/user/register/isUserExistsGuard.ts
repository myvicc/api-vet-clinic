import { isUserExist } from '../../../services/user.service';
import { RouteHandler } from 'fastify';
import { UserType } from '../../../types/User.type';

export const isUserExistsGuard: RouteHandler<{
  Body: Pick<UserType, 'email'>;
}> = async (request, reply) => {
  if (await isUserExist(request.body.email)) {
    reply.status(400);
    reply.send({ message: 'User with such email already exists' });
  }
};
