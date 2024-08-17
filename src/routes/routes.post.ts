import { Router } from 'express';
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
  setUserId,
  getMyPosts,
  notUpdatedOwnPostUser,
} from '../controllers/controllers.post';

import { postValidate, updateValidate } from '../validations/validations.post';

import middlewaresValidation from '../middlewares/middlewares.validation';

import validationsParam from '../validations/validations.param';
import { protect, restrictTo } from '../middlewares/middlewares.auth';

export default (router: Router): Router => {
  // protected routes
  router.use(protect);

  // get all posts for logged in user
  router.get('/posts/me', restrictTo('user', 'manager', 'admin'), getMyPosts);

  router
    .route('/posts')
    .get(restrictTo('user', 'manager', 'admin'), getAllPosts)
    .post(
      restrictTo('user', 'manager', 'admin'),
      postValidate,
      setUserId,
      middlewaresValidation,
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
      notUpdatedOwnPostUser,
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
