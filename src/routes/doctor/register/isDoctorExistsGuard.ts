import { isDoctorExist } from '../../../services/doctor.service';
import { RouteHandler } from 'fastify';
import { UserType } from '../../../types/User.type';

export const isDoctorExistsGuard: RouteHandler<{
  Body: Pick<UserType, 'email'>;
}> = async (request, reply) => {
  if (await isDoctorExist(request.body.email)) {
    reply.status(400);
    reply.send({ message: 'User with such email already exists' });
  }
};
