import { checkDoctorPassword } from '../services/doctor.service.js';

export const checkDoctorPasswordGuard = async (request, reply) => {
  if (!(await checkDoctorPassword(request.body.email, request.body.password))) {
    reply.status(400);
    reply.send({ message: 'User with such email does not exist' });
  }
};
