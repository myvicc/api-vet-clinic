import { Pet } from '../mongo.models/pets.js';

export const isPetExist = async (name, userId) => {
  const existPet = await Pet.findOne({
    name,
    ownerId: userId,
  });
};

export const createPet = async ({
  name,
  breed,
  microchip,
  dateOfBirth,
  userId,
}) => {
  const pet = new Pet({
    name,
    breed,
    microchip,
    dateOfBirth,
    ownerId: userId,
  });
  await pet.save();
};
