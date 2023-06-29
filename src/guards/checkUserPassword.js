import { checkUserPassword } from '../services/user.service.ts';

export const checkUserPasswordGuard = async (request, reply) => {
  if (!(await checkUserPassword(request.body.email, request.body.password))) {
    reply.status(400);
    reply.send({ message: 'User with such email does not exist' });
  }
};
