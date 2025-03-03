// import { NextFunction, Request, Response } from "express";
//  const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = 500;
//     const  message = err.message || 'Internal Server Error';
//       return res.status(statusCode).json({
//         message,
//         success : false,
//         status: err,
//       })
//   }
//   export default globalErrorHandler

import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../../config';
import handleZodError from '../../errors/handleZodError';
import handleValidationError from '../../errors/handleValidationError';
import handelCastError from '../../errors/handelCastError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import AppError from '../../errors/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something Went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handelCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    // err,
    errorSources,
    stack: config.NODE_ENV === 'DEVELOPMENT' ? err?.stack : null,
  });
};

export default globalErrorHandler;

// pattern
/*
 * success
 * message
 * errorSources : [
 *   path : " ",
 *   message : " "
 * ]
 * stack
 */
