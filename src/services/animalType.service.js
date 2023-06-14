import { AnimalType } from '../mongo.models/AnimalType.js';

export const createAnimalType = async (typeOfAnimal) => {
  const animalType = new AnimalType({
    typeOfAnimal,
  });
  await animalType.save();
  return animalType;
};

export const isAnimalTypeExist = async (typeOfAnimal) => {
  const animalType = await AnimalType.findOne({ typeOfAnimal });
  return !!animalType;
};
export const isAnimalTypeExistById = async (animalTypeId) => {
  const animalType = await AnimalType.findById(animalTypeId);
  return !!animalType;
};

export const updateAnimalType = async (animalTypeId, typeOfAnimal) => {
  const animalType = await AnimalType.findById(animalTypeId);
  animalType.typeOfAnimal = typeOfAnimal;
  await animalType.save();
};

export const deleteAnimalType = async (animalTypeId) => {
  await AnimalType.findByIdAndDelete(animalTypeId);
};

export const listOfAnimalType = async () => {
  const list = await AnimalType.find();
  return list;
};

export const oneOfAnimalType = async (animalTypeId) => {
  return AnimalType.findById(animalTypeId);
};
