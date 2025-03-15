import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .Pagination()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate('academicDepartment');
  return result;
};

const updateFacultyIntoDB = async (_id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };
  // Loop through the keys in the payload
  for (const [key, value] of Object.entries(payload)) {
    if (key === 'name' && value && typeof value === 'object') {
      // Handle name object (which is nested)
      for (const [nameKey, nameValue] of Object.entries(
        value as Record<string, unknown>,
      )) {
        modifiedUpdateData[`name.${nameKey}`] = nameValue;
      }
    } else {
      // For other fields, directly add them
      modifiedUpdateData[key] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate({ _id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const facultyDelete = await Faculty.findByIdAndUpdate(
      id ,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!facultyDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faculty Is delate Failed');
    }

    const userId = facultyDelete.user;
    const userDelete = await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      },
    );
    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User Is delate Failed');
    }

    await session.commitTransaction();
    await session.endSession();
    return facultyDelete;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
