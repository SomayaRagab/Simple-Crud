import AppError from '../utils/utils.appError';
import { Request, Response, NextFunction   } from 'express'; // Ensure correct imports

function globalError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'CastError') err = handleCastErrorDB(err);
  if (err.code == 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
}




const handleDuplicateFieldsDB = (err: any) => {
  console.log('-------');
  const value = err.keyValue;
  const message = `Duplicate field value: ${value.email || ''} ${
    value.name || ''
  }. Please use another value!`;
  // 400: Bad Request
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  // 400: Bad Request
  return new AppError(message, 400);
};

const handleCastErrorDB = (err: any) => {
    console.log('-------***');
  const message = `Invalid ${err.path}: ${err.value}.`;
  // 400: Bad Request
  return new AppError(message, 400);
};

export default globalError;
