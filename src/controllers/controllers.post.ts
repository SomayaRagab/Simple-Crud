import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory';
import Post from '../models/models.post';
import AuthRequest from '../utils/utils.extendRequest';
import { Response, NextFunction } from 'express';
import catchAsync from '../utils/utils.catchAsync';
import AppError from '../utils/utils.appError';

export const getAllPosts = getAll(Post);
export const getPost = getOne(Post);
export const createPost = createOne(Post);
export const updatePost = updateOne(Post);
export const deletePost = deleteOne(Post);

// if no user in body , use login user
export const setUserId = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// get all posts for logged in user
export const getMyPosts = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  }
);

// not updated own user post
export const notUpdatedOwnPostUser = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    // check if user updated post is the same as logged in user
    if (req.body.user && req.body.user !== req.user.id) {
      return next(new AppError('You can only update your own posts', 403));
    }
    next();
  }
);
