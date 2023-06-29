import { User } from '../mongo.models/users.js';
import { hash } from 'bcrypt';
import { generateAccessToken, isPasswordsCompared } from './auth.service.js';

type User = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};
export const signUpUser = async ({
  lastName,
  firstName,
  email,
  password,
}: User) => {
  const user = new User({
    firstName,
    lastName,
    email,
    password: await hash(password, 10),
  });
  await user.save();
  return user;
};

export const isUserExist = async (email: string) => {
  const user = await User.findOne({ email });
  return !!user;
};

export const checkUserPassword = async (email, password) => {
  const user = await User.findOne({ email });
  return isPasswordsCompared(password, user.password);
};
export const loginUser = async (email) => {
  const user = await User.findOne({ email });
  return generateAccessToken({ id: user._id });
};
