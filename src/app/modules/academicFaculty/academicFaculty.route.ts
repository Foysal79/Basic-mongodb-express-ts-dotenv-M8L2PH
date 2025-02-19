import express from "express"
import { AcademicFacultyControllers } from "./academicFaculty.controller"
import validateRequest from "../middlwares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";


const router = express.Router()

router.post('/create-academic-faculty', 
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
     AcademicFacultyControllers.createAcademicFaculty);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

router.put('/:facultyId', 
    validateRequest(AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema), 
    AcademicFacultyControllers.updateAcademicFaculty);


export const AcademicFacultyRoutes = router