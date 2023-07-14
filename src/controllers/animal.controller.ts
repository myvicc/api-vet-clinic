import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from '../services/animal.service';
import { RouteHandler } from 'fastify';
import { AnimalType } from '../types/Animal.type';

export const createAnimalController: RouteHandler<{
  Body: Omit<AnimalType, 'id' | 'ownerId'>;
}> = async (request, reply) => {
  const { name, age, breed, animalTypeId } = request.body;

  const owner = request.user;

  if (request.user && owner) {
    await createAnimal({ name, age, breed, animalTypeId, ownerId: owner.id });
    reply.status(201);
    return { message: 'Such animal  was created' };
  }
};

export const updateAnimalController: RouteHandler<{
  Params: Pick<AnimalType, 'id'>;
  Body: Omit<AnimalType, 'id' | 'ownerId'>;
}> = async (request, reply) => {
  const { id } = request.params;
  const { name, breed, age, animalTypeId } = request.body;
  await updateAnimal({ id, name, age, breed, animalTypeId });
  reply.status(200);
  return { message: 'Animal type was updated' };
};

export const deleteAnimalController: RouteHandler<{
  Params: Pick<AnimalType, 'id'>;
}> = async (request, reply) => {
  const { id } = request.params;
  await deleteAnimal(id);
  reply.status(200);
  return { message: 'Animal was deleted' };
};
