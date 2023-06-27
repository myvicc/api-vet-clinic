import { isAnimalTypeExistById } from '../services/animalType.service.js';

export const isAnimalTypeNotExistByIdGuard = async (request, reply) => {
  if (!(await isAnimalTypeExistById(request.params.animalTypeId))) {
    reply.status(400);
    reply.send({ message: 'Such animal type does not exist' });
  }
};
