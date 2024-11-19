import { StudentModel } from "../student.model";
import { StudentInterface } from "./student.interface";


// create student
const createStudentIntoDB = async( student : StudentInterface) => {
  const result =  await StudentModel.create(student);
  return result;
}
// all student find 
const getAllStudentFromDB = async() => {
    const result = await StudentModel.find();
    return result;
}

// single student find
const getSingleStudentFromDB = async(id : string) => {
    const result = await StudentModel.findOne({id});
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB
}