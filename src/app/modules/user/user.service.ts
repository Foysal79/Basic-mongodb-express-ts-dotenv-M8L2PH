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


import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { StudentInterface } from "../students/student.interface";
import { StudentModel } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentID } from "./user.utils";

const createStudentIntoDB = async (password : string ,payload : StudentInterface) => {

    const userData : Partial<TUser> = {}

   

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)


    userData.id = await generatedStudentID(admissionSemester);
    userData.password = password || config.default_password,
    userData.role = 'student'
    //  create a user 
    const newUser = await User.create(userData);
    // create a student
    if(Object.keys(newUser).length){
        payload.id = newUser.id, // Embedded id
        payload.user = newUser._id; // refereeing id
        const NewStudent = await StudentModel.create(payload);
        return NewStudent ;
    }
   return newUser;
}

export const userService = {
    createStudentIntoDB,

}