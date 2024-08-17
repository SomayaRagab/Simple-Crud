import { Router } from 'express';
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/controllers.post';

import { postValidate, updateValidate } from '../validations/validations.post';

import middlewaresValidation from '../middlewares/middlewares.validation';

import validationsParam from '../validations/validations.param';
import { restrictTo } from '../middlewares/middlewares.auth';

export default (router: Router): Router => {
  router.route('/posts').get(restrictTo('manager', 'admin'), getAllPosts).post(
    restrictTo('user', 'manager', 'admin'),
    //   postValidate,
    //   middlewaresValidation,
    createPost
  );
  router
    .route('/posts/:id')
    .get(restrictTo('user', 'manager', 'admin'), getPost)
    .patch(
      restrictTo('user', 'manager', 'admin'),
      validationsParam,
      updateValidate,
      middlewaresValidation,
      updatePost
    )
    .delete(
      restrictTo('admin'),
      validationsParam,
      middlewaresValidation,
      deletePost
    );

  return router;
};
