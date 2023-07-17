import { Animal } from '../mongo.models/animal';
import { AnimalType } from '../types/Animal.type';

export const createAnimal = async ({
  name,
  age,
  breed,
  animalTypeId,
  ownerId,
}: Omit<AnimalType, 'id'>) => {
  const animal = new Animal({
    name,
    age,
    breed,
    animalTypeId,
    ownerId,
  });
  await animal.save();
  return animal;
};

export const isAnimalExist = async ({
  name,
  ownerId,
}: Pick<AnimalType, 'name' | 'ownerId'>) => {
  const animal = await Animal.findOne({ name, ownerId });
  return !!animal;
};
export const isAnimalExistById = async ({
  id,
  ownerId,
}: Pick<AnimalType, 'id' | 'ownerId'>) => {
  const animal = await Animal.findById(id);
  if (animal && animal.ownerId.toString() === ownerId) {
    return !!animal;
  }
};

export const updateAnimal = async ({
  id,
  name,
  age,
  breed,
  animalTypeId,
}: Omit<AnimalType, 'ownerId'>) => {
  const animal = await Animal.findById(id);
  if (animal) {
    animal.name = name;
    animal.age = age;
    animal.breed = breed;
    animal.animalTypeId = animalTypeId;
    return await animal.save();
  }
  return 'Unknown error';
};

export const deleteAnimal = async (id: string) => {
  await Animal.findByIdAndDelete(id);
};

export const listOfAnimal = async (ownerId: Pick<AnimalType, 'ownerId'>) => {
  const list = await Animal.find(ownerId);
  return list.map((animal) => {
    return {
      id: animal._id,
      name: animal.name,
      age: animal.age,
      breed: animal.breed,
      animalTypeId: animal.animalTypeId,
      ownerId: animal.ownerId,
    };
  });
};

export const getOneOwnAnimal = async ({ id }: Pick<AnimalType, 'id'>) => {
  return Animal.findById(id);
};
