import { isDoctorExist } from '../services/doctor.service.js';

export const isDoctorExistsGuard = async (request, reply) => {
  if (await isDoctorExist(request.body.email)) {
    reply.status(400);
    reply.send({ message: 'User with such email already exists' });
  }
};
