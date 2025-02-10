// import { NextFunction, Request, Response } from "express";
// import { userService } from "./user.service";
// import sendResponse from "../../utils/sendResponse";
// import httpStatus from 'http-status'



// const createStudent = async (req : Request, res : Response, next : NextFunction) => {
//     try {
//         const { password, student: studentData } = req.body;
//         const result = await userService.createStudentIntoDB(password, studentData);
//         sendResponse(res , {
//             statusCode : httpStatus.OK,
//             success: true,
//             message: "Student created successfully",
//             data: result,
//         })}

// catch(error) {
//         next(error);
//     }
// }

// export const userControllers = {
//     createStudent
// }

import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'
//  catch Async Function make its mantine try catch function 
const catchAsync = (fn : RequestHandler) => {
   return (req:Request, res : Response, next : NextFunction) => {
       Promise.resolve(fn(req, res, next)).catch((err) => next(err));
   }
}
// create student 
const createStudent = catchAsync( async (req : Request, res : Response, next : NextFunction) => {
      const {password, student : studentData} = req.body;
      const result = await userService.createStudentIntoDB(password, studentData);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully",
        data: result,
      })
});
export const userControllers = {
    createStudent
}