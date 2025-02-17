import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';  
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(
    async (req: Request, res:Response, next:NextFunction) => {
        const result = AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
        try{
            const data = await result;
            sendResponse(res, {
                statusCode : httpStatus.CREATED,
                success : true,
                message : "Academic Semester Create Successfully",
                data : data,
            })
        } catch(err)
        {
            sendResponse(res, {
                statusCode : httpStatus.BAD_REQUEST,
                success : false,
                message : "Academic Semester is not be create",
                data : err,
            }) 
        }
        
       
    }
)

const getAllAcademicSemesters = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Academic Semester Get All Successfully",
            data: result,
        })
    }
)


export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
}