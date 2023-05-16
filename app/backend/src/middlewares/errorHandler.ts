import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const { message } = error;

  if (message === 'Invalid email or password') {
    return res.status(401).json({ message });
  }
  return res.status(500).json({ message });
};

export default errorHandler;
