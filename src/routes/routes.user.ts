import { Router } from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/controllers.user';
import {
  createUserValidation,
  updateUserValidation,
} from '../validations/validations.user';
import validationsParam from '../validations/validations.param';
import middlewaresValidation from '../middlewares/middlewares.validation';
import { protect, restrictTo } from '../middlewares/middlewares.auth';

export default (router: Router): Router => {
  router
    .route('/users')
    .get(
      protect,
      // restrictTo('manager', 'admin'),
      getAllUsers
    )
    .post(
      // restrictTo('admin'),
      createUserValidation,
      middlewaresValidation,
      createUser
    );
  router
    .route('/users/:id')
    .get(
      // restrictTo('manager', 'admin'),
      validationsParam,
      middlewaresValidation,
      getUser
    )
    .patch(
      // validationsParam,
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
