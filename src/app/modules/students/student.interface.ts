import { Schema, connect, Model,  Types } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.

export type Guardian = 
    {
        fatherName : string;
        fatherOccupation : string;
        fatherContactNo : string;
        motherName : string;
        motherOccupation : string;
        motherContactNo : string;
    }
 export type UserName = {
    firstName: string;
    middleName:string;
    lastName : string;
}

export type LocalGuardian = {
        name : string;
        contactNo : string; 
        address : string;
}

 export type StudentInterface =  {
    id : string;
    user : Types.ObjectId;
    
    name : UserName,
    email: string;
    avatar?: string;
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    contactNo : string;
    emergencyContactNo : string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress : string;
    permanentAddress : string;
    guardian: Guardian ;
    localGuardian : LocalGuardian; 
    profileImg?: string;
    isDeleted : boolean
  }

 //* creating a  custom instance method
  // export type studentMethods = {
  //   isUserExits(id : string) : Promise<StudentInterface | null>
  // }

  // export type studentModel1 = Model<StudentInterface, {}, studentMethods>;





  //* create a custom static methods
 export interface studentModel1 extends Model<StudentInterface>{
    isUserExists(id : string ) : Promise<StudentInterface | null>
  }
