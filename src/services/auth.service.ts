import { compare } from 'bcrypt';
import pkg, { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

const { sign } = pkg;

const SECRET_WORD = 'secret';
export const isPasswordsCompared = async (
  password: string,
  hashedPassword: string
) => {
  return compare(password, hashedPassword);
};

export const generateAccessToken = async (payload: JwtPayload) => {
  return sign(payload, SECRET_WORD, { expiresIn: '20m' });
};

export const verifyAccessToken = (token: string): JwtPayload | string => {
  return verify(token, SECRET_WORD);
};
