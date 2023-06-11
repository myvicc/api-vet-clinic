import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
const {
  default: { sign },
} = jwt;

const SECRET_WORD = 'secret'; //must be separated
export const isPasswordsCompared = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

export const generateAccessToken = async (payload) => {
  return sign(payload, SECRET_WORD, { expiresIn: '20m' });
};

export const verifyAccessToken = async (accessToken) => {
  await verify(accessToken, SECRET_WORD);
};
