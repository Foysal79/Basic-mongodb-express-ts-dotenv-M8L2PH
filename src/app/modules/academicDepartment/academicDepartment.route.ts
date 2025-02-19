import express from "express"
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../middlwares/validateRequest";
import { academicSemesterValidation } from "../academicSemester/academicSemester.validation";


const router = express.Router();

