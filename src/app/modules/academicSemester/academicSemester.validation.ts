import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";
import { TAcademicSemesterName } from "./academicSemester.interface";

const createAcademicSemesterValidationSchema = z.object({
    body : z.object({
        name : z.enum([...AcademicSemesterName] as [string, ...string[]]),
        year : z.string(),
        code : z.enum([...AcademicSemesterCode] as [string, ...string[]]),
        startMonths : z.enum([...months] as [string, ...string[]]),
        endMonths : z.enum([...months] as [string, ...string[]]),
    })

})


const updateAcademicSemesterValidationSchema = z.object({
    body : z.object({
        name : z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
        year : z.string().optional(),
        code : z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
        startMonths : z.enum([...months] as [string, ...string[]]).optional(),
        endMonths : z.enum([...months] as [string, ...string[]]).optional()
    })
})



export const academicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}