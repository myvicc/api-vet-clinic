import { isDoctorExist } from '../services/doctor.service.js';

export const isDoctorNotExistsGuard = async (request, reply) => {
  if (!(await isDoctorExist(request.body.email))) {
    reply.status(400);
    reply.send({ message: 'User with such email does not exist' });
  }
};
