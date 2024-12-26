import { ObjectId } from "mongoose";
import config from "../../config";
import { StudentInterface } from "../students/student.interface";
import { StudentModel } from "../students/student.model";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";

//* create student
const createStudentIntoDB = async (password : string, studentData: StudentInterface) => {

    // create a user object
    const userData : Partial<TUser> = {}
    // if password is not given, use default password
    userData.password = password || config.default_password ;
    // set student role 
    userData.role = 'student';

    // set manually generated id
    userData.id = '2030100001'

    // create a user
    const newUser = await User.create(userData);

    // create a student
    if(Object.keys(newUser).length){
        // set id , _id
        studentData.id = newUser.id ; // Embedded id
        studentData.user = newUser._id; // referencing id


        const newStudent = await StudentModel.create(studentData);
        return newStudent ;
    }

};


export const userService = {
    createStudentIntoDB
}