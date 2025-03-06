// import { ObjectId } from "mongoose";
// import config from "../../config";
// import { StudentInterface } from "../students/student.interface";
// import { StudentModel } from "../students/student.model";
// import { NewUser, TUser } from "./user.interface";
// import { User } from "./user.model";

// //* create student
// const createStudentIntoDB = async (password : string, studentData : StudentInterface) => {
//     // create a user object
//     const userData : Partial<TUser> = {}
//       // set manually generated id
//       userData.id = 'A20301000011';
//     // if password is not given, use default password
//     userData.password = password || config.default_password ;
//     // set student role
//     userData.role = 'student';

//     // create a user
//     const newUser = await User.create(userData);

//     // create a student
//     if(Object.keys(newUser).length){
//         // set id , _id
//         studentData.id = newUser.id ; // Embedded id
//         studentData.user = newUser._id; // referencing id

//         const newStudent = await StudentModel.create(studentData);
//         return newStudent ;
//     }

//     return newUser;

// };

// export const userService = {
//     createStudentIntoDB
// }

import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { StudentInterface } from '../students/student.interface';
import { StudentModel } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

export const userService = {
  createStudentIntoDB,
};
