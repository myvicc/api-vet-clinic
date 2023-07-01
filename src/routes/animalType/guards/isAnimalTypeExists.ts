import { isAnimalTypeExist } from '../../../services/animalType.service';
import { RouteHandler } from 'fastify';
import { AnimalTypeType } from '../../../types/AnimalType.type';

export const isAnimalTypeExistsGuard: RouteHandler<{
  Body: Pick<AnimalTypeType, 'type'>;
}> = async (request, reply) => {
  if (await isAnimalTypeExist(request.body.type)) {
    reply.status(400);
    reply.send({ message: 'Such animal type already exists' });
  }
};
