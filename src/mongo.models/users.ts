import { Schema, model } from 'mongoose';
import { UserType } from '../types/User.type';

const userSchema = new Schema<Omit<UserType, 'id'>>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = model<Omit<UserType, 'id'>>('users', userSchema);
