import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, StudentInterface, UserName } from './students/student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
    firstName: { 
        type: String, 
        required: [true, "First Name is required. Please provide your first name."],
        trim : true,  // space remover
        validate : {
            validator : (value : string) =>validator.isAlpha(value),
            message : '{VALUE} is no valid',
        }
        
    },
    middleName: { 
        type: String, 
        required: [true, "Middle Name is required. Please provide your middle name."] 
    },
    lastName: { 
        type: String, 
        required: [true, "Last Name is required. Please provide your last name."] 
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: { 
        type: String, 
        required: [true, "Father's name is required."] 
    },
    fatherOccupation: { 
        type: String, 
        required: [true, "Father's occupation is required."] 
    },
    fatherContactNo: { 
        type: String, 
        required: [true, "Father's contact number is required."] 
    },
    motherName: { 
        type: String, 
        required: [true, "Mother's name is required."] 
    },
    motherOccupation: { 
        type: String, 
        required: [true, "Mother's occupation is required."] 
    },
    motherContactNo: { 
        type: String, 
        required: [true, "Mother's contact number is required."] 
    },
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: { 
        type: String, 
        required: [true, "Local guardian's name is required."] 
    },
    contactNo: { 
        type: String, 
        required: [true, "Local guardian's contact number is required."],
        
    },
    address: { 
        type: String, 
        required: [true, "Local guardian's address is required."] 
    },
});

// Main Student Schema
const studentSchema = new Schema<StudentInterface>({
    id: { 
        type: String, 
        required: [true, "Student ID is required."], 
        unique: true 
    },
    name: { 
        type: userNameSchema, 
        required: [true, "Student name is required."] 
    },
    email: { 
        type: String, 
        required: [true, "Email is required."], 
        unique: true,
        validate : {
            validator : (value : string) => validator.isEmail(value),
            message : '{VALUE} is no valid'
        }
    },
    avatar: { 
        type: String 
    },
    gender: { 
        type: String, 
        enum: { 
            values: ["male", "female", "other"], 
            message: "{VALUE} is not a valid gender. Please select from 'male', 'female', or 'other'." 
        }, 
        required: [true, "Gender is required."] 
    },
    dateOfBirth: { 
        type: String 
    },
    contactNo: { 
        type: String, 
        required: [true, "Contact number is required."] 
    },
    emergencyContactNo: { 
        type: String, 
        required: [true, "Emergency contact number is required."] 
    },
    bloodGroup: { 
        type: String, 
        enum: { 
            values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], 
            message: "{VALUE} is not a valid blood group. Please provide a valid blood group." 
        }
    },
    presentAddress: { 
        type: String, 
        required: [true, "Present address is required."] 
    },
    permanentAddress: { 
        type: String, 
        required: [true, "Permanent address is required."] 
    },
    guardian: { 
        type: guardianSchema, 
        required: [true, "Guardian information is required."] 
    },
    localGuardian: { 
        type: localGuardianSchema, 
        required: [true, "Local guardian information is required."] 
    },
    profileImg: { 
        type: String 
    },
    isActive: { 
        type: String, 
        enum: { 
            values: ['active', 'blocked'], 
            message: "{VALUE} is not a valid status. Please use 'active' or 'blocked'." 
        }, 
        default: 'active' 
    },
});

export const StudentModel = model<StudentInterface>('Student', studentSchema);
