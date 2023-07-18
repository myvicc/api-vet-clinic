import mongoose from 'mongoose';

const AnimalTypeSchema = new mongoose.Schema({
  type: String,
});

export const AnimalType = mongoose.model('animalType', AnimalTypeSchema);
