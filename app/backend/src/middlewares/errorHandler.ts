import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const { message } = error;

  if (message === 'Invalid email or password') {
    return res.status(401).json({ message });
  }
  if (message === 'It is not possible to create a match with two equal teams') {
    return res.status(422).json({ message });
  }
  if (message === 'There is no team with such id!') {
    return res.status(404).json({ message });
  }
  return res.status(500).json({ message });
};

export default errorHandler;
