import { z } from "zod";


const createAcademicDepartmentValidationSchema = z.object({
    body : z.object({
        name : z.string({
            invalid_type_error : " academic Department must be string ",
            required_error : " Name is Required  ",
        }),
        academicFaculty : z.string({
            invalid_type_error : " academic Faculty must be string ",
            required_error : " Academic Faculty is Required  ",
        })
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body : z.object({
        name : z.string({
            invalid_type_error : " academic Department must be string ",
            required_error : " Name is Required  ",
        }).optional(),
        academicFaculty : z.string({
            invalid_type_error : " academic Faculty must be string ",
            required_error : " Academic Faculty is Required  ",
        }).optional(),
    })
})


export const createAcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema

}