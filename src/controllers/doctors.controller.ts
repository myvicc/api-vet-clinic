import { loginDoctor, signupDoctor } from '../services/doctor.service';
import { RouteHandler } from 'fastify';
import { DoctorType } from '../types/doctor.type';

export const registerDoctorController: RouteHandler<{
  Body: Omit<DoctorType, 'id'>;
}> = async (request, reply) => {
  const { email, password, firstName, lastName } = request.body;
  await signupDoctor({ firstName, lastName, password, email });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginDoctorController: RouteHandler<{
  Body: Pick<DoctorType, 'email'>;
}> = async (request, reply) => {
  const { email } = request.body;
  reply.status(200);
  return { accessToken: await loginDoctor(email) };
};
