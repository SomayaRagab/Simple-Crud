import { validationResult } from 'express-validator';
import AppError from '../utils/utils.appError';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  
  if (!result.isEmpty()) {
    // Use the `array()` method to access errors
    const errorsArray = result.array();
    
    // Create a combined error message string
    const errorMsg = errorsArray.map(error => error.msg).join(', ');

    // Pass the error to the global error handler
    return next(new AppError(errorMsg, 400));
  }
  
  next();
};
