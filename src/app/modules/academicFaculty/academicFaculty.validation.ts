import { z } from "zod";


const academicFacultyValidationSchema = z.object({
    name : z.string({
        invalid_type_error : "Academic Faculty be given pls"
    })
})

export const AcademicFacultyValidation = {
    academicFacultyValidationSchema,
} 