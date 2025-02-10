import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  StudentInterface,
  studentModel1,
  UserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required. Please provide your first name.'],
    trim: true, // space remover
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is no valid',
    },
  },
  middleName: {
    type: String,
    required: [
      true,
      'Middle Name is required. Please provide your middle name.',
    ],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required. Please provide your last name.'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

// Main Student Schema
const studentSchema = new Schema<StudentInterface, studentModel1>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user : {
      type: Schema.Types.ObjectId,
       ref : 'User',
      required: [true, 'user ID is required.'],
     
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is no valid',
      },
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not a valid gender. Please select from 'male', 'female', or 'other'.",
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
      required : false
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message:
          '{VALUE} is not a valid blood group. Please provide a valid blood group.',
      },
      required : false
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    profileImg: {
      type: String,
      required: false
    }
  },
  {
    toJSON: {
      virtuals : true,
    },
  },
);

//* mongoDB virtual

// studentSchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
// });

//* pre save middleware / hook
// studentSchema.pre('save', async function (next) {
//   const student = this;
//   student.password = await bcrypt.hash(
//     student.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

//* post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//   (doc.password = ''), next();
// });

//* Query Middleware
// find in data with out deleted data
// studentSchema.pre('find', function (next) {
//   this.find({
//     isDeleted: { $ne: true },
//   });
//   next();
// });
// find single data with out deleted data ( static method )
// studentSchema.pre('find', function (next) {
//   this.findOne({
//     isDeleted: { $ne: true },
//   });
//   next();
// });

// find single data with out deleted data middleware
// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//* creating a make custom instance method
// studentSchema.methods.isUserExits = async function(id : string) {
//     const existingUser = await StudentModel.findOne({id});
//     return existingUser;
// }
// export const StudentModel = model<StudentInterface, studentModel1>('Student', studentSchema);

//* creating a make custom static method
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await StudentModel.findOne({ id });

//   return existingUser;
// };

export const StudentModel = model<StudentInterface, studentModel1>(
  'Student', studentSchema);
