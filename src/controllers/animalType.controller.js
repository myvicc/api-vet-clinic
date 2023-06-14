import {
  createAnimalType,
  deleteAnimalType,
  isAnimalTypeExist,
  isAnimalTypeExistById,
  listOfAnimalType,
  oneOfAnimalType,
  updateAnimalType,
} from '../services/animalType.service.js';

export const createAnimalTypeController = async (request, reply) => {
  const { typeOfAnimal } = request.body;
  if (await isAnimalTypeExist(typeOfAnimal)) {
    reply.status(400);
    return { message: 'Such animal type already exists' };
  }
  await createAnimalType(typeOfAnimal);
  reply.status(201);
  return { message: 'Such animal type was created' };
};

export const updateAnimalTypeController = async (request, reply) => {
  const { typeOfAnimal } = request.body;
  const { animalTypeId } = request.params;
  if (!(await isAnimalTypeExistById(animalTypeId))) {
    reply.status(400);
    return { message: 'Such animal type does not exist' };
  }
  await updateAnimalType(animalTypeId, typeOfAnimal);
  reply.status(200);
  return { message: 'Animal type was updated' };
};

export const deleteAnimalTypeController = async (request, reply) => {
  const { animalTypeId } = request.params;
  if (!(await isAnimalTypeExistById(animalTypeId))) {
    reply.status(400);
    return { message: 'Such animal type does not exist' };
  }
  await deleteAnimalType(animalTypeId);
  reply.status(200);
  return { message: 'Animal type was deleted' };
};

export const getListOfAnimalTypeController = async (request, reply) => {
  reply.status(200);
  return await listOfAnimalType();
};

export const getOneOfAnimalTypeController = async (request, reply) => {
  const { animalTypeId } = request.params;
  if (!(await isAnimalTypeExistById(animalTypeId))) {
    reply.status(400);
    return { message: 'Such animal type does not exist' };
  }
  reply.status(200);
  return { typeOfAnimal: await oneOfAnimalType(animalTypeId) };
};
