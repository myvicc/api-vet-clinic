import {
  checkDoctorPassword,
  isDoctorExist,
  loginDoctor,
  signupDoctor,
} from '../services/doctor.service.js';

export const registerDoctorController = async (request, reply) => {
  const { email, password, firstName, lastName } = request.body;
  if (await isDoctorExist(email)) {
    reply.status(400);
    return { message: 'User with such email already exists' };
  }
  await signupDoctor({ firstName, lastName, password, email });
  reply.status(201);
  return { message: 'User with such email was registered' };
};

export const loginDoctorController = async (request, reply) => {
  const { email, password } = request.body;
  if (!(await isDoctorExist(email))) {
    reply.status(400);
    return { message: 'User with such email does not exist' };
  }
  if (!(await checkDoctorPassword(email, password))) {
    reply.status(400);
    return { message: 'password not compared' };
  }
  reply.status(200);
  return { accessToken: await loginDoctor(email) };
};
