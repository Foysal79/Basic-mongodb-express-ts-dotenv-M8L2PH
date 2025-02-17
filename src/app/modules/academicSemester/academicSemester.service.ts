import { NextFunction } from "express";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async(payload : TAcademicSemester) => {
    if(academicSemesterNameCodeMapper[payload.name] !== payload.code)
        {
            
           throw new Error("Invalid academic semester name and code")
        }
       const result = await AcademicSemester.create(payload);
       return result;
}

const  getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB
}