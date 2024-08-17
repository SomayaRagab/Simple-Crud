import { body } from 'express-validator';
import AppError from '../utils/utils.appError';

export const createUserValidation = [
  body('firstName')
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage('First name must be between 3 and 50 characters'),
  body('lastName')
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage('Last name must be between 3 and 50 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isStrongPassword()
    .withMessage('Password is not strong enough'),
  body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new AppError('Passwords do not match', 400);
    }
    return true;
  }),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'manager'])
    .default('user')
    .withMessage('Role is either: user , manager or admin'),
];

export const updateUserValidation = [
  body('firstName')
    .optional()
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage('First name must be between 3 and 50 characters'),
  body('lastName')
    .optional()
    .isString()
    .isLength({ min: 3, max: 50 })
    .withMessage('Last name must be between 3 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'manager'])
    .withMessage('Role is either: user , manager or admin'),
];
