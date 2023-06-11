import { User } from '../mongo.models/user.js';
import { hash } from 'bcrypt';
import { generateAccessToken, isPasswordsCompared } from './auth.service.js';

export const signUpUser = async ({ lastName, firstName, email, password }) => {
  const user = new User({
    firstName,
    lastName,
    email,
    password: await hash(password, 10),
  });
  await user.save();
  return user;
};

export const isUserExist = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};

export const checkUserPassword = async (email, password) => {
  const user = await User.findOne({ email });
  await isPasswordsCompared(password, user.password);
};

export const loginUser = async (email) => {
  const user = await User.findOne({ email });
  await generateAccessToken({ id: user._id });
};
