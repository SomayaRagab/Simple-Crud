import { login, register } from '../controllers/controllers.auth';
import { Router } from 'express';

export default (router: Router): Router => {
  console.log('auth router');

  router.post('/auth/login', login);
  router.post('/auth/register', register);

  return router;
};
