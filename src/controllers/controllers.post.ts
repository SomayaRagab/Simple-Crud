import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory';
import Post from '../models/models.post';

export const getAllPosts = getAll(Post);
export const getPost = getOne(Post);
export const createPost = createOne(Post);
export const updatePost = updateOne(Post);
export const deletePost = deleteOne(Post);
