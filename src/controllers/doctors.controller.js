import { loginDoctor, signupDoctor } from '../services/doctor.service.js';

export const registerDoctorController = async (request, reply) => {
  const { email, password, firstName, lastName } = request.body;
  await signupDoctor({ firstName, lastName, password, email });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginDoctorController = async (request, reply) => {
  const { email } = request.body;
  reply.status(200);
  return { accessToken: await loginDoctor(email) };
};
