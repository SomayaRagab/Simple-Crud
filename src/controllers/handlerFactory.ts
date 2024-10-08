import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/utils.appError';
import catchAsync from '../utils/utils.catchAsync';
import APIFeatures from '../utils/apiFeature';

// get all documents
const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const apiFeatures = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const documents = await apiFeatures.query;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data: {
        documents,
      },
    });
  });

// get document by id
const getOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

// create document

const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

// update document
const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

// delete document
const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export { getAll, getOne, createOne, updateOne, deleteOne };
