import { isAnimalExist } from '../../../services/animal.service';
import { RouteHandler } from 'fastify';
import { AnimalType } from '../../../types/Animal.type';

export const isAnimalExistGuard: RouteHandler<{
  Body: Pick<AnimalType, 'name'>;
}> = async (request, reply) => {
  if (await isAnimalExist(request.body.name)) {
    reply.status(400);
    reply.send({ message: 'Such animal already exists' });
  }
};
