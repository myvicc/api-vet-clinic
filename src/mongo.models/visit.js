import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  pet: mongoose.Schema.Types.ObjectId,
  doctor: mongoose.Schema.Types.ObjectId,
  date: Date,
  diagnosis: String,
  prescription: String,
  description: String,
});

export const Visit = mongoose.model('visits', visitSchema);
