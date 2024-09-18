import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(
      400,
      'The Id is not valid, please ensure the ID is a valid MongoDB ObjectId.',
    );
  }
  next();
};
