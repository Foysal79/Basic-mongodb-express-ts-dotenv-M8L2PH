import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import { promise, z } from "zod";
import studentValidationSchema from "./student.zod.validation";
// higher order function catch Async for handel clean code ( try catch function mantine)  
const catchAsync = (fn : RequestHandler) => {
   return (req : Request, res:Response, next: NextFunction ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
   }
}
// get all student
const getAllStudents = catchAsync(async(req:Request, res:Response, next : NextFunction) => {
   const result = await StudentServices.getAllStudentFromDB();
   res.status(200).json({
      message : "Student is fetched successfully",
      success : true,
      data : result
   })
});
// get single student
const  getSingleStudent = catchAsync( async(req : Request, res : Response, next : NextFunction) => {
    const {studentId} = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
        message : "Student is fetched successfully",
        success : true,
        data : result
    })
})


//* deleted single student
const deleteStudent = catchAsync( async(req : Request , res : Response, next : NextFunction) => {
        const {studentId} = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
          success : true,
          message : "Student is deleted successfully",
          data : result,
        })
} )


export const studentController = {
    
    getAllStudents,
    getSingleStudent,
    deleteStudent
}