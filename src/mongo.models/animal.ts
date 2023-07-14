import { model, Schema } from 'mongoose';
import { AnimalType } from '../types/Animal.type';

const animalSchema = new Schema<Omit<AnimalType, 'id'>>({
  name: String,
  age: Number,
  breed: String,
  animalTypeId: Schema.Types.ObjectId,
  ownerId: Schema.Types.ObjectId,
});

export const Animal = model<Omit<AnimalType, 'id'>>('animal', animalSchema);
