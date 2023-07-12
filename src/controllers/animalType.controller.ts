import {
  createAnimalType,
  deleteAnimalType,
  listOfAnimalType,
  oneOfAnimalType,
  updateAnimalType,
} from '../services/animalType.service';
import { RouteHandler } from 'fastify';
import { AnimalTypeType } from '../types/AnimalType.type';

export const createAnimalTypeController: RouteHandler<{
  Body: Pick<AnimalTypeType, 'type'>;
}> = async (request, reply) => {
  const { type } = request.body;
  await createAnimalType(type);
  reply.status(201);
  return { message: 'Such animal type was created' };
};

export const updateAnimalTypeController: RouteHandler<{
  Body: Pick<AnimalTypeType, 'type'>;
  Params: Pick<AnimalTypeType, 'id'>;
}> = async (request, reply) => {
  const { type } = request.body;
  const { id } = request.params;
  await updateAnimalType({ id, type });
  reply.status(200);
  return { message: 'Animal type was updated' };
};

export const deleteAnimalTypeController: RouteHandler<{
  Params: Pick<AnimalTypeType, 'id'>;
}> = async (request, reply) => {
  const { id } = request.params;
  await deleteAnimalType(id);
  reply.status(200);
  return { message: 'Animal type was deleted' };
};

export const getListOfAnimalTypeController: RouteHandler = async (
  request,
  reply
) => {
  reply.status(200);
  return await listOfAnimalType();
};

export const getOneOfAnimalTypeController: RouteHandler<{
  Params: Pick<AnimalTypeType, 'id'>;
}> = async (request, reply) => {
  const { id } = request.params;
  reply.status(200);
  return await oneOfAnimalType(id);
};
