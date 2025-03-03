import express from "express"
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../middlwares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";


const router = express.Router();

router.post('/create-academic-department', 
    // validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
      AcademicDepartmentControllers.createAcademicDepartment)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);


router.get('/:academicId', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch('/:academicId', 
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment);

export const AcademicDepartmentRouter = router