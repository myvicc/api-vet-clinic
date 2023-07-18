import { isAnimalExist } from '../../../services/animal.service';
import { RouteHandler } from 'fastify';
import { AnimalType } from '../../../types/Animal.type';

export const isAnimalExistGuard: RouteHandler<{
  Body: Pick<AnimalType, 'name'>;
}> = async (request, reply) => {
  if (request.user) {
    const owner = request.user;
    if (await isAnimalExist({ name: request.body.name, ownerId: owner.id })) {
      reply.status(400);
      reply.send({ message: 'Such animal already exists' });
    }
  }
};
