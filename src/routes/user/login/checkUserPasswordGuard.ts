import { checkUserPassword } from '../../../services/user.service';
import { RouteHandler } from 'fastify';
import { UserType } from '../../../types/User.type';

export const checkUserPasswordGuard: RouteHandler<{
  Body: Pick<UserType, 'email' | 'password'>;
}> = async (request, reply) => {
  const { email, password } = request.body;
  if (!(await checkUserPassword({ email, password }))) {
    reply.status(400);
    reply.send({ message: 'User with such email does not exist' });
  }
};
