import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, StudentInterface, UserName } from './students/student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: { type : String, required : true},
    middleName:{ type : String, required : true},
    LastName : { type : String, required : true},
})

const guardianSchema = new Schema<Guardian>({
        fatherName : { type : String, required : true},
        fatherOccupation : { type : String, required : true},
        fatherContactNo : { type : String, required : true},
        motherName : { type : String, required : true},
        motherOccupation : { type : String, required : true},
        motherContactNo : { type : String, required : true},
})

const localGuardianSchema = new Schema<LocalGuardian>({
    name : { type : String, required : true},
    contactNo : { type : String, required : true},
    address : { type : String, required : true},
})


// maine Student Schema 
const studentSchema = new Schema<StudentInterface>({
    id : { type : String, required : true},
    name : userNameSchema ,
    email: { type : String, required : true},
    avatar: { type : String },
    gender: ["male" , "female"],
    dateOfBirth : { type : String},
    contactNo : { type : String, required : true},
    emergencyContactNo : { type : String, required : true},
    bloodGroup : ["A+" , "A-" , "B+" , "B-" , "O+" , "O-" , "AB+" , "AB-"],
    presentAddress : { type : String, required : true},
    permanentAddress : { type : String, required : true},
    guardian: guardianSchema,
    localGuardian : localGuardianSchema,
    profileImg: { type : String},
    isActive : ['active' , 'inActive']
})


//const User = model<IUser>('User', userSchema);
export const StudentModel = model<StudentInterface>('Student', studentSchema)
