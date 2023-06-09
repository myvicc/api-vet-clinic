import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
const {
  default: { sign },
} = jwt;

const SECRET_WORD = 'secret';
export const isPasswordsCompared = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

export const generateAccessToken = async (payload) => {
  return sign(payload, SECRET_WORD, { expiresIn: '20m' });
};
