import { z } from "zod";


const academicFacultyValidationSchema = z.object({
    body : z.object({
        name : z.string({
            invalid_type_error : "Academic Faculty be given pls"
        })
    })
})
const UpdateAcademicFacultyValidationSchema = z.object({
    body : z.object({
        name : z.string({
            invalid_type_error : "Academic Faculty be given pls"
        }).optional()
    })
})


export const AcademicFacultyValidation = {
    academicFacultyValidationSchema,
    UpdateAcademicFacultyValidationSchema
} 