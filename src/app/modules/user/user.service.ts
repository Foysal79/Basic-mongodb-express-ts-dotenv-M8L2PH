import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { StudentInterface } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generatedFaculty,
  generatedStudentID,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { TAdmin } from '../admin/admin.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { Admin } from '../admin/admin.model';

const createStudentIntoDB = async (
  password: string,
  payload: StudentInterface,
) => {
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // create session
  const session = await mongoose.startSession();
  try {
    // start session
    session.startTransaction();
    const userData: Partial<TUser> = {};

    userData.id = await generatedStudentID(
      admissionSemester as TAcademicSemester,
    );
    (userData.password = password || config.default_password),
      (userData.role = 'student');
    //  create a user ( Transactions - 1 )
    const newUser = await User.create([userData], { session });
    // create a student
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User to not be create this moment',
      );
    }
    // set id, _id as user
    (payload.id = newUser[0].id), // Embedded id
      (payload.user = newUser[0]._id); // refereeing id
    const newStudent = await StudentModel.create([payload], { session });
    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Not to create student this moment',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given , use default password
  userData.password = password || (config.default_password as string);
  // set role as faculty
  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic Department not found');
  }
  // create a user ( Transactions  )
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //  generate id
    userData.id = await generatedFaculty();

    // create user (transactions - 1 )
    const newUser = await User.create([userData], { session });

    // create a faculty
    if (!newUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Not to create user this moment',
      );
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference

    // create a faculty (transactions - 2 )
    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Not to create faculty this moment',
      );
    }

    // commit transaction
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user
  const userData: Partial<TUser> = {};
  // if password is not be given use default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    // create user (transactions - 1 )
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // referencing _id

    // create a faculty (transactions - 2 )

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // commit transaction
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
