import { NextFunction, Request, Response } from 'express';

import { IUser } from '../interfaces/Iuser.interface';

function validateInput(password: string, email: string) {
  if (password.length < 6) {
    const message = 'Invalid email or password';
    return { status: 401, message };
  }

  const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  if (!regexEmail.test(email)) {
    const message = 'Invalid email or password';
    return { status: 401, message };
  }

  return null;
}

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body as IUser;

  if (!email || !password) {
    const message = 'All fields must be filled';
    return res.status(400).json({ message });
  }

  const error = validateInput(password, email);

  if (error) return res.status(error.status).json({ message: error.message });

  next();
}
