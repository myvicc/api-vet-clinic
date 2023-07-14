import { RouteHandler } from 'fastify';
import { isAnimalExistById } from '../../../services/animal.service';
import { AnimalType } from '../../../types/Animal.type';

export const isAnimalNotExistByIdGuard: RouteHandler<{
  Params: Pick<AnimalType, 'id'>;
}> = async (request, reply) => {
  if (request.user) {
    const owner = request.user;

    if (
      !(await isAnimalExistById({ id: request.params.id, ownerId: owner.id }))
    ) {
      reply.status(400);
      reply.send({ message: 'Animal with such id does not exist' });
    }
  }
};
