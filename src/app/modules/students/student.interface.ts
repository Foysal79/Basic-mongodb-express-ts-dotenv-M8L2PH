import { Schema, model, connect } from 'mongoose';
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
    LastName : string;
}

export type LocalGuardian = {
        name : string;
        contactNo : string; 
        address : string;
}

 export type StudentInterface =  {
    id : string;
    name : UserName,
    email: string;
    avatar?: string;
    gender: "male" | "female";
    dateOfBirth?: string;
    contactNo : string;
    emergencyContactNo : string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress : string;
    permanentAddress : string;
    guardian: Guardian ;
    localGuardian : LocalGuardian; 
    profileImg?: string;
    isActive : 'active' | 'inActive';
  }