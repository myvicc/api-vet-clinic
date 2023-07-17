import { model, Schema, Types } from 'mongoose';
import { AnimalType } from '../types/Animal.type';

const animalSchema = new Schema<Omit<AnimalType, 'id'>>({
  name: String,
  age: Number,
  breed: String,
  animalTypeId: { type: Types.ObjectId, ref: 'AnimalType' },
  ownerId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const Animal = model<Omit<AnimalType, 'id'>>('animal', animalSchema);
