import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

// get all student
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  res.status(200).json({
    message: 'Student is fetched successfully',
    success: true,
    data: result,
  });
});
// get single student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  res.status(200).json({
    message: 'Single Student is fetched successfully',
    success: true,
    data: result,
  });
});

//* deleted single student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

//* Update Student
const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateStudentFromDB(id, student);
    res.status(200).json({
      success: true,
      message: 'Student is update successfully',
      data: result,
    });
  },
);

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
