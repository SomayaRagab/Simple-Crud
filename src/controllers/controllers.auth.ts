import catchAsync from '../utils/utils.catchAsync';
import AppError from '../utils/utils.appError';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthRequest from '../utils/utils.extendRequest';
import User from '../models/models.user';
import bcrypt from 'bcrypt';

// send token to client
const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// login user
export const login = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    // check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    // if (!user || !(await correctPassword(password, user.password))) {
    //   return next(new AppError('Incorrect email or password', 401));
    // }

    // if everything is ok, send token to client
    const token = signToken(user?._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  }
);

// const correctPassword = async function (
//   candidatePassword: string,
//   userPassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// register user
export const register = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(200).json({
      status: 'success',
      token,
      user: newUser,
    });
  }
);
