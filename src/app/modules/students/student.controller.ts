import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";


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
    
    getAllStudents,
    getSingleStudent,
    deleteStudent
}