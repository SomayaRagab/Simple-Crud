import { body } from 'express-validator';

const postValidate = [
  body('title').isString().withMessage('title is required'),
  body('content').isString().withMessage('content is required'),
];

const updateValidate = [
  body('title').optional().isString().withMessage('title is required'),
  body('content').optional().isString().withMessage('content is required'),
];

export { postValidate, updateValidate };
