import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const generateToken = (user: string) => {
  const token = jwt.sign({ user }, secretKey, configJWT);
  return token;
};

export default generateToken;

// export const validateToken = (token:string) => {
//   if (!token) return false;
//   try {
//     const isValid = jwt.verify(token, secretKey);

//     return isValid;
//   } catch (error) {
//     return {};
//   }
// };
