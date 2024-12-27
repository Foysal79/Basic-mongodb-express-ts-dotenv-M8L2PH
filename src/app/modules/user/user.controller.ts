import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";


const createStudent = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { password, student: studentData } = req.body;
        console.log("password : ", password , "student data :", studentData );
        const result = await userService.createStudentIntoDB(password, studentData);
        res.status(200).json({
            message: "Student created successfully",
            data: result,
            success : true
        })

    } catch(error) {
        next(error);
    }
}

export const userControllers = {
    createStudent
}