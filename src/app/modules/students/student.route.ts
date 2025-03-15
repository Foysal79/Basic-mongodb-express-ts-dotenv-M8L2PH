import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../middlwares/validateRequest';
import { studentValidations } from './student.zod.validation';

const router = express.Router();
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);

export const StudentRoutes = router;
