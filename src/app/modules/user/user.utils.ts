import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    {
      role: 'student', // all of student role data given
    },
    {
      id: 1, // id given
      _id: 0, // _id not be given
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudentId?.id ? lastStudentId.id : undefined;
};

// year - semesterCode - 4 digit number
export const generatedStudentID = async (payload: TAcademicSemester) => {
  // first time 0000 padStar
  let currentId = (0).toString(); // default
  const latsStudentId = await findLastStudentId();
  const lastStudentSemesterCode = latsStudentId?.substring(4, 6);
  const lastStudentYear = latsStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    latsStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    //2030010001
    currentId = latsStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};


export const generatedFaculty = async() => {

}



export const generatedAdmin = async() => {

}