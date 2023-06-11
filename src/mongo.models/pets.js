import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  microchip: String,
  dateOfBirth: Date,
  ownerId: mongoose.Schema.Types.ObjectId, //owner
  visit: [mongoose.Schema.Types.ObjectId],
});
export const Pet = mongoose.model('Pets', petSchema);
