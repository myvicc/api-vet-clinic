import { AnimalType } from '../mongo.models/AnimalType';
import { AnimalTypeType } from '../types/AnimalType.type';

export const createAnimalType = async (type: string) => {
  const animalType = new AnimalType({
    type,
  });
  await animalType.save();
  return animalType;
};

export const isAnimalTypeExist = async (type: string) => {
  const animalType = await AnimalType.findOne({ type });
  return !!animalType;
};
export const isAnimalTypeExistById = async (id: string) => {
  const animalType = await AnimalType.findById(id);
  return !!animalType;
};

export const updateAnimalType = async ({
  id,
  type,
}: Pick<AnimalTypeType, 'type' | 'id'>) => {
  const animalType = await AnimalType.findById(id);
  if (animalType) {
    animalType.type = type;
    await animalType.save();
  }
  return 'Unknown error';
};

export const deleteAnimalType = async (id: string) => {
  await AnimalType.findByIdAndDelete(id);
};

export const listOfAnimalType = async () => {
  const list = await AnimalType.find();
  return list.map((animalType) => {
    return {
      ...animalType,
      id: animalType._id,
    };
  });
};

export const oneOfAnimalType = async (id: string) => {
  return AnimalType.findById(id);
};
