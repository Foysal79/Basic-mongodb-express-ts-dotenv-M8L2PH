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
import catchAsync from "../../utils/catchAsync";

// create student 
const createStudent = catchAsync( async (req : Request, res : Response) => {
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