import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createAcademicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';  


const createAcademicFaculty = catchAsync(
    async (req : Request, res: Response, next: NextFunction) => {
       const result = await createAcademicFacultyService.createAcademicFacultyIntoDB(req.body);
       sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success : true,
        message: "Academic Faculty created successfully",
        data: result
       })
    }
)

const getAllAcademicFaculty = catchAsync(
    async (req : Request, res: Response, next: NextFunction) => { 
      const result = await createAcademicFacultyService.getAllAcademicFacultiesFromDB();
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success : true,
        message: "Academic Faculty list retrieved successfully",
        data: result
      })
    }
)

const getSingleAcademicFaculty = catchAsync(
    async (req : Request, res: Response, next: NextFunction) => {
        const {facultyId} = req.params;
        console.log(facultyId)
        const result = await createAcademicFacultyService.getSingleAcademicFacultiesFromDB(facultyId);
        const data = await result;
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message: "Academic Faculty retrieved successfully",
            data: result
         } )
     }
)

const updateAcademicFaculty = catchAsync(
    async (req : Request, res: Response, next: NextFunction) => {
        const {facultyId} = req.params;
        const result = await createAcademicFacultyService.updateAcademicFacultyIntoDB(facultyId, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message : "Academic Faculty Update Successfully",
            data: result
        })
    }
)

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}