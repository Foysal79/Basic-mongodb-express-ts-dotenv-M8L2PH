import express from "express"
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../middlwares/validateRequest";
import { academicSemesterValidation } from "../academicSemester/academicSemester.validation";


const router = express.Router();

router.post('/create-academic-department', 
    validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),
      AcademicDepartmentControllers.createAcademicDepartment)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);


router.get('/:academicId', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch('/:academicId', AcademicDepartmentControllers.updateAcademicDepartment);

export const AcademicDepartmentRouter = router