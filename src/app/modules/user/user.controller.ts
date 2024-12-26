import { Request, Response } from "express";
import studentValidationSchema from "../students/student.zod.validation";
import { StudentInterface } from "../students/student.interface";
import { userService } from "./user.service";


const createStudent = async (req : Request, res : Response) => {
    try {

        const {password, student : studentData}  = req.body;
        // const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await userService.createStudentIntoDB(password, studentData);
        res.status(200).json({
            message: "Student created successfully",
            data: result,
            success : true
        })

    } catch(error) {
        res.status(500).json({
            message: "Error creating student",
            error: error,
            success : false
        })
    }
}

export const userController = {
    createStudent
}