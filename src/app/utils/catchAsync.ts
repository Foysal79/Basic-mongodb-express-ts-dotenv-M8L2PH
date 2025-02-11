import { NextFunction, Request, RequestHandler, Response } from "express";

// higher order function catch Async for handel clean code ( try catch function mantine)  
const catchAsync = (fn : RequestHandler) => {
   return (req : Request, res:Response, next: NextFunction ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
   }
}


export default catchAsync;