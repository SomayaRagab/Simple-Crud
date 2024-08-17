import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import catchAsync from '../utils/utils.catchAsync';
import User from '../models/models.user';
import AuthRequest from '../utils/utils.extendRequest';
import AppError from '../utils/utils.appError';

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1) Getting token and check if it's there
    let token = req.get('authorization')?.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined') {
      return next(new AppError('Access Denied. please login', 401));
    }

    // 2) Verification token
    const decoded: any = await jwt.verify(token, process.env.JWT_SECRET || '');
    console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  }
);

export const restrictTo = (...roles: any) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};
