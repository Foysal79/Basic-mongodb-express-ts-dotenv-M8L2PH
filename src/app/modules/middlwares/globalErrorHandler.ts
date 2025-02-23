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
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something Went wrong',
    },
  ];

  if(err instanceof ZodError) {
   
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    Error : err
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
