import { StudentModel } from "../student.model";
import { StudentInterface } from "./student.interface";


//* create student
const createStudentIntoDB = async ( studentData : StudentInterface) => { 
//* building custom instance methods
// const student1 = new StudentModel(studentData) 
//   if(await student1.isUserExits(studentData.id)){
//     throw new Error('user already exists !')
//   }
//   const result1 = await student1.save();

//* building custom static methods
  if(await StudentModel.isUserExists(studentData.id)){
    throw new Error('user already exists !');
  }
  const result =  await StudentModel.create(studentData); // building static methods

  return result;
}
//* all student find 
const getAllStudentFromDB = async() => {
    const result = await StudentModel.find();
    return result;
}

//* single student find
const getSingleStudentFromDB = async(id : string) => {
    // const result = await StudentModel.findOne({id});
    const result = await StudentModel.aggregate([
      {$match : {id : id} }
    ])
    return result;
}

const deleteStudentFromDB = async(id: string) => {
  const result = await StudentModel.updateOne({id}, {isDeleted : true});
  return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}