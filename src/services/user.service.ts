import { User } from '../mongo.models/users';
import { hash } from 'bcrypt';
import { generateAccessToken, isPasswordsCompared } from './auth.service';
import { UserType } from '../types/User.type';

export const signUpUser = async ({
  lastName,
  firstName,
  email,
  password,
}: Pick<UserType, 'firstName' | 'lastName' | 'email' | 'password'>) => {
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

export const checkUserPassword = async ({
  email,
  password,
}: Pick<UserType, 'email' | 'password'>) => {
  const user = await User.findOne({ email });
  if (!user) {
    return 'Unknown error';
  }
  if (typeof user.password === 'string') {
    return isPasswordsCompared(password, user.password);
  }
  return 'Unknown error';
};
export const loginUser = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return 'Unknown error';
  }
  return generateAccessToken({ id: user._id, userType: 'user' });
};

export const getUserById = async ({ id }: Pick<UserType, 'id'>) => {
  const user = await User.findById(id);
  return user;
};
