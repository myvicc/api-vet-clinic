import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

const { sign } = jwt;

const SECRET_WORD = 'secret';
export const isPasswordsCompared = async (
  password: string,
  hashedPassword: string
) => {
  return compare(password, hashedPassword);
};

type JwtPayload = {
  id: string | Object;
};
export const generateAccessToken = async (payload: JwtPayload) => {
  return sign(payload, SECRET_WORD, { expiresIn: '20m' });
};

export const verifyAccessToken = async (token: string) => {
  return verify(token, SECRET_WORD);
};
