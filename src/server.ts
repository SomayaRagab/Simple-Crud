import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' });

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

const port = process.env.PORT || 3000;

// connect to database
const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
);

mongoose
  .connect(DB || '')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error connecting to database', err);
  });

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//  subscribe Unhandled Rejection not handled by express like mongoose connection error
// process emit unhandledRejection event
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
