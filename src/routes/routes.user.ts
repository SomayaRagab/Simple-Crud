import { Router } from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updatePassword,
  updateMe,
  getMe,
} from '../controllers/controllers.user';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/validations.user';
import validationsParam from '../validations/validations.param';
import middlewaresValidation from '../middlewares/middlewares.validation';
import { protect, restrictTo } from '../middlewares/middlewares.auth';

export default (router: Router): Router => {
  // GIVE PROFILE
  router.get('/profile', protect, getMe);
  router.patch('/profile', protect, updateMe);
  router.patch('/profile/password', protect, updatePassword);

  router
    .route('/users')
    .get(protect, restrictTo('manager', 'admin'), getAllUsers)
    .post(
      restrictTo('admin'),
      createUserValidation,
      middlewaresValidation,
      createUser
    );
  router
    .route('/users/:id')
    .get(
      restrictTo('manager', 'admin'),
      validationsParam,
      middlewaresValidation,
      getUser
    )
    .patch(
      restrictTo('manager', 'admin'),
      validationsParam,
      updateUserValidation,
      middlewaresValidation,
      updateUser
    )
    .delete(
      restrictTo('admin'),
      validationsParam,
      middlewaresValidation,
      deleteUser
    );

  return router;
};
