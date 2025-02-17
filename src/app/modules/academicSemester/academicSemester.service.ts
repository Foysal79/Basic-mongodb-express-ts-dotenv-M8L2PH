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
// get all Academic Semester From Database
const  getAllAcademicSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}

// get Single Academic Semester From DAtabase
const getSingleAcademicSemesterFrom = async (id: string) => {
   const result = await AcademicSemester.findById(id);
   return result;
}

// update Academic Semester 
const updateAcademicSemesterIntoDB = async (id:string, payload : Partial<TAcademicSemester>) => {
    if ( payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code ) 
    {
        throw new Error('Invalid Semester Code');
      }
      
      const result = await AcademicSemester.findByIdAndUpdate({_id :id}, payload, {
        new : true,
      });
      return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFrom,
    updateAcademicSemesterIntoDB
}