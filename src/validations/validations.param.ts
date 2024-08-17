import { param } from 'express-validator';

export default [
  param('id').isMongoId().withMessage('parameters must be mongoId'),
];
