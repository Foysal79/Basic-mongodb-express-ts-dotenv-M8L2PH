import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../middlwares/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudent);
router.delete('/:studentId', studentController.deleteStudent);
router.patch('/:studentId', 
    validateRequest(studentValidations.updateStudentValidationSchema), 
    studentController.updateStudent
);

export const StudentRoutes = router;
