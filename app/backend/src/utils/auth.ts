import * as jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/Iuser.interface';

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const generateToken = (email: string) => {
  const token = jwt.sign({ email }, secretKey, configJWT);
  return token;
};

export default generateToken;

export const validateToken = (token: string): IToken => {
  try {
    const decoded = jwt.verify(token, secretKey) as IToken;
    return decoded;
  } catch (error) {
    throw new Error();
  }
};
