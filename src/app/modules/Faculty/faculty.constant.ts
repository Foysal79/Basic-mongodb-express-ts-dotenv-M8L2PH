import { TBloodGroup, TGender } from "./faculty.interface";



export const Gender : TGender[] = ['male', 'female', 'others']

export const BloodGroup : TBloodGrou[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ];


  export const FacultySearchableFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
  ];