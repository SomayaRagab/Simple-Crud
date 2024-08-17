import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// import
import globalError from './middlewares/middlewares.globalError';
import AppError from './utils/utils.appError';
import router from './routes/index';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1', router());

// global not found route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalError);

// export app
export default app;
