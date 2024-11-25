import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";

const createStudent = async(req:Request, res : Response) => {
      try{
        
        const student = req.body.student;
        //* Creating A Schema Validation using ZOD
        const zodParseData = studentValidationSchema.parse(student);

       const result = await StudentServices.createStudentIntoDB(zodParseData);
     res.status(200).json({
        message : "Student is create successfully",
        success : true,
        data : result
     })
      }catch(error : any){
      res.status(500).json({
        message : error.message || "something went Wrong ",
        success : false,
        error : error,
      })
      }
}

const getAllStudents = async(req:Request, res:Response) => {
    try {
     const result = await StudentServices.getAllStudentFromDB();
     res.status(200).json({
        message : "Student is fetched successfully",
        success : true,
        data : result
     })
    } catch(error)
    {
      console.log(error);
    }

}

const  getSingleStudent = async(req : Request, res : Response) => {
  try {
    const {studentId} = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
        message : "Student is fetched successfully",
        success : true,
        data : result
    })

  }catch(error) {
    console.log(error);
  }
}


//* deleted student

const deleteStudent = async(req : Request , res : Response) => {
 
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
    res.status(500).json({
      success : false,
      message : "Error deleting student",
      data : error
    })
  }

} 


export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
}