import mongoose from 'mongoose';

const AnimalTypeSchema = new mongoose.Schema({
  typeOfAnimal: String,
});

export const AnimalType = mongoose.model('animalType', AnimalTypeSchema);
