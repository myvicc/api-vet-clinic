import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  pet: [mongoose.Schema.Types.ObjectId],
});

export const User = mongoose.model('users', userSchema);
