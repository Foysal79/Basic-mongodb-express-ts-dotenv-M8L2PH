import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async(req:Request, res : Response) => {
      try{
        const student = req.body.student;
       const result = await StudentServices.createStudentIntoDB(student);
     res.status(200).json({
        message : "Student is create successfully",
        success : true,
        data : result
     })
      }catch(error){
      console.log(error);
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


export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent
}