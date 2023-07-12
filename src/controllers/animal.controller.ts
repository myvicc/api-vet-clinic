import { createAnimal } from '../services/animal.service';
import { RouteHandler } from 'fastify';
import { AnimalType } from '../types/Animal.type';

export const createAnimalController: RouteHandler<{
  Body: Omit<AnimalType, 'id'>;
}> = async (request, reply) => {
  const { name, age, breed, animalType } = request.body;
  //const { token } = request.params;
  if (request.user) {
    await createAnimal({ name, age, breed, animalType });
    reply.status(201);
    return { message: 'Such animal type was created' };
  }
};
