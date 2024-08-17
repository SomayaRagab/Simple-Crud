import { login, register } from '../controllers/controllers.auth';
import { Router } from 'express';
import { createUserValidation } from '../validations/validations.user';
import middlewaresValidation from '../middlewares/middlewares.validation';

export default (router: Router): Router => {
  router.post('/auth/login', login);
  router.post(
    '/auth/register',
    createUserValidation,
    middlewaresValidation,
    register
  );

  return router;
};
