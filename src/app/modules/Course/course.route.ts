import express from 'express';
import validateRequest from '../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deletedCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesWithCourse,
);

export const CourseRoutes = router;
