import express, { Router } from 'express';
import userRouter from './routes.user';
import postRouter from './routes.post';
import authRouter from './routes.auth';

import { protect } from '../middlewares/middlewares.auth';

export default (): express.Router => {
  const router: express.Router = express.Router();

  console.log('index router');

  // Create an instance of Router
  const appRouter: Router = Router();

  // Mount userRouter with the appRouter
  appRouter.use(userRouter(appRouter));
  // appRouter.use(protect, postRouter(appRouter));
  appRouter.use(authRouter(appRouter));

  // Use appRouter as middleware in the main router
  router.use(appRouter);

  return router;
};