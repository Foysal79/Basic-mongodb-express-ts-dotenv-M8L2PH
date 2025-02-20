import { StudentModel } from './student.model';
import { StudentInterface } from './student.interface';


//* all student find
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find().populate({
    path : "academicDepartment",
    populate : {
      path : "academicFaculty",
    }
  }).populate("admissionSemester");
  return result;
};

//* single student find
const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id});
  // const result = await StudentModel.aggregate([{ $match: { id: id } }])
  const result = await StudentModel.findById(id).populate({
    path : "academicDepartment",
    populate : {
      path : "academicFaculty",
    }
  }).populate("admissionSemester");
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
