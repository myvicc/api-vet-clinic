import { Animal } from '../mongo.models/animal';
import { AnimalType } from '../types/Animal.type';

export const createAnimal = async ({ name, age, breed, animalType }) => {
  const animal = new Animal({
    name,
    age,
    breed,
    animalType
  });
  await animal.save();
  return animal;
};

export const isAnimalExist = async (name: string) => {
  const animal = await Animal.findOne({ name });
  return !!animal;
};
export const isAnimalExistById = async (id: string) => {
  const animal = await Animal.findById(id);
  return !!animal;
};

export const updateAnimal = async ({
  id,
  name,
  age,
  breed,
  animalType,
}: Omit<AnimalType, 'owner'>) => {
  const animal = await Animal.findById(id);
  if (animal) {
    animal.name = name;
    animal.age = age;
    animal.breed = breed;
    animal.animalType = animalType;
    await animal.save();
  }
  return 'Animal does not exist';
};

export const deleteAnimal = async (id: string) => {
  await Animal.findByIdAndDelete(id);
};

export const listOfAnimal = async () => {
  const list = await Animal.find();
  return list.map((animal) => {
    return {
      id: animal._id,
      name: animal.name,
      age: animal.age,
      breed: animal.breed,
      animalType: animal.animalType,
      owner.id: animal.ownerId,
    };
  });
};

export const oneOfAnimal = async (id: string) => {
  return Animal.findById(id);
};
