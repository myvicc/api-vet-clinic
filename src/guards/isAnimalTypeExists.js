import { isAnimalTypeExist } from '../services/animalType.service.js';

export const isAnimalTypeExistsGuard = async (request, reply) => {
  if (await isAnimalTypeExist(request.body.typeOfAnimal)) {
    reply.status(400);
    reply.send({ message: 'Such animal type already exists' });
  }
};
