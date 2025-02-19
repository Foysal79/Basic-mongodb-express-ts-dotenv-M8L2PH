import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentService } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status'; 

const createAcademicDepartment = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {
        
       const result = await academicDepartmentService.createAcademicDepartmentInoDB(req.body);
       

       sendResponse(res, {
        statusCode: httpStatus.OK,
        success : true,
        message: "Academic department  created successfully",
        data: result
      })
    }
)

const getAllAcademicDepartment = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {
        const result = await academicDepartmentService.getAllAcademicDepartmentFromDB();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message: "Academic Department list retrieved successfully",
            data: result
        })
    }
)

const getSingleAcademicDepartment = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {
        const {academicId} = req.params
        
        const result = await academicDepartmentService.getSingleAcademicDepartmentFromDB(academicId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message: "Academic Department retrieved successfully",
            data: result
        })
    }
)

const updateAcademicDepartment = catchAsync(
    async (req : Request, res : Response, next : NextFunction) => {
        const {academicId} = req.params
        const result = await academicDepartmentService.UpdateAcademicDepartmentFromDB(academicId, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success : true,
            message: "Academic Department retrieved successfully",
            data: result
        })
    }
)

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}