import { NextFunction, Request, Response } from "express";

 const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
 
    const statusCode = 500;
    
    const  message = err.message || 'Internal Server Error';
      return res.status(statusCode).json({
        message,
        success : false,
        status: err,
        
      })
      
  }


  export default globalErrorHandler