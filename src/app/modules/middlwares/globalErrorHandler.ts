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

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

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

  const handleZodError = (err: ZodError) => {
    errorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;
    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorSources = simplifiedError.errorSources);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack : config.NODE_ENV === 'DEVELOPMENT' ? err?.stack : null ,
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
