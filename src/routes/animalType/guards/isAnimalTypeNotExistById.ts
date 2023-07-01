import { isAnimalTypeExistById } from '../../../services/animalType.service';
import { RouteHandler } from 'fastify';
import { AnimalTypeType } from '../../../types/AnimalType.type';

export const isAnimalTypeNotExistByIdGuard: RouteHandler<{
  Params: Pick<AnimalTypeType, 'id'>;
}> = async (request, reply) => {
  if (!(await isAnimalTypeExistById(request.params.id))) {
    reply.status(400);
    reply.send({ message: 'Such animal type does not exist' });
  }
};
