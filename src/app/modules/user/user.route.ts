// import  express from "express"
// import {  userControllers } from "./user.controller";

// const router = express.Router();

// router.post('/create-student', userControllers.createStudent)

// export const UserRoutes = router;

import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { studentValidations } from '../students/student.zod.validation';
import { AnyZodObject } from 'zod';
import validateRequest from '../middlwares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const UserRoutes = router;
