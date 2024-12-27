import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";


const getAllStudents = async(req:Request, res:Response, next : NextFunction) => {
    try {
     const result = await StudentServices.getAllStudentFromDB();
     res.status(200).json({
        message : "Student is fetched successfully",
        success : true,
        data : result
     })
    } catch(error)
    {
      next(error);
    }

}

const  getSingleStudent = async(req : Request, res : Response, next : NextFunction) => {
  try {
    const {studentId} = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
        message : "Student is fetched successfully",
        success : true,
        data : result
    })

  }catch(error) {
    next(error);
  }
}


//* deleted student

const deleteStudent = async(req : Request , res : Response, next : NextFunction) => {
 
  try{
        const {studentId} = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
          success : true,
          message : "Student is deleted successfully",
          data : result,
        })
  }
  catch(error){
    next(error);
  }

} 


export const studentController = {
    
    getAllStudents,
    getSingleStudent,
    deleteStudent
}