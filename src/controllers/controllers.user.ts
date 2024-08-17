import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory';
import User from '../models/models.user';

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
