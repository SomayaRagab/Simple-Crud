import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory';
import User from '../models/models.user';
import AuthRequest from 'utils/utils.extendRequest';
import { Response, NextFunction } from 'express';
import catchAsync from '../utils/utils.catchAsync';
import AppError from '../utils/utils.appError';

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

// get logged in user
export const getMe = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }
);

// update password
export const updatePassword = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      return next(
        new AppError(
          'Please provide all required fields currentPassword, newPassword, newPasswordConfirm',
          400
        )
      );
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return next(new AppError(`No user found with that ID`, 404));
    }

    if (!(await user.correctPassword(currentPassword, user.password))) {
      return next(new AppError(`Incorrect current password`, 401));
    }
    // update password
    user.password = newPassword;
    user.passwordChangedAt = new Date(Date.now() - 1000);

    await user.save();

    // send response
    res.status(200).json({
      status: 'success',
      message: 'password updated successfully',
    });
  }
);

// update me
export const updateMe = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /profile/password',
          400
        )
      );
    }

    // 2) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
);
