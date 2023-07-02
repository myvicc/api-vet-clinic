import { checkDoctorPassword } from '../../../services/doctor.service';
import { RouteHandler } from 'fastify';
import { UserType } from '../../../types/user.type';

export const checkDoctorPasswordGuard: RouteHandler<{
  Body: Pick<UserType, 'email' | 'password'>;
}> = async (request, reply) => {
  const { email, password } = request.body;
  if (!(await checkDoctorPassword({ email, password }))) {
    reply.status(400);
    reply.send({ message: 'User with such email does not exist' });
  }
};