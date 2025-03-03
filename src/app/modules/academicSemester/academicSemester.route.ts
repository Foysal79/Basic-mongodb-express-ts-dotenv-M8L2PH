
import express from "express"
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../middlwares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";

const router = express.Router()


router.post('/create-academic-semester', 
    validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema),  AcademicSemesterControllers.createAcademicSemester)
// single id base get
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)
// update
router.patch('/:semesterId', AcademicSemesterControllers.updateAcademicSemester )
// all academic semester get
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters );

export const AcademicSemesterRoutes = router;