import { createPet, isPetExist } from '../services/pet.service.js';
import { isTypeDoctor } from '../services/doctor.service.js';
import { verifyAccessToken } from '../services/auth.service.js';

export const createPetController = async (request, reply) => {
  const { name, breed, microchip, dateOfBirth, userId } = request.body;
  const { accessToken } = request.header;

  if (!(await verifyAccessToken(accessToken))) {
    reply.status(400);
    return { message: 'Cannot access this action' };
  }
  if (!(await isTypeDoctor(accessToken.id))) {
    reply.status(400);
    return { message: 'Cannot access this action' };
  }
  if (await isPetExist(name, userId)) {
    reply.status(400);
    return { message: 'Pet with such email already exists' };
  }
  await createPet({ name, breed, microchip, dateOfBirth, ownerId: userId });
  reply.status(200);
  return { message: 'Pet with such email was created' };
};
