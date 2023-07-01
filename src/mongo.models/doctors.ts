import mongoose from 'mongoose';

const doctorsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const Doctor = mongoose.model('doctors', doctorsSchema);
