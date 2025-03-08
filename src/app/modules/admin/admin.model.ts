import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required. Please provide your first name.'],
    trim: true,
    maxlength: [20, 'First Name Can not be More than 20 Characters'],
  },
  middleName: {
    type: String,
    required: [
      true,
      'Middle Name is required. Please provide your middle name.',
    ],
    trim: true,
    maxlength: [15, 'First Name Can not be More than 15 Characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required. Please provide your last name.'],
    trim: true,
    maxlength: [20, 'First Name Can not be More than 20 Characters'],
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is Must be required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is Must be required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is Must be required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message:
          '{VALUE} is not a valid gender. Please provide a valid gender.',
      },
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required. Please provide your email.'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact Number is Must be required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergency Contact Number Must be Required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address Must be Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address Must be Required'],
    },
    profileImg: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
// generate full name
adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    this?.name?.middleName +
    ' ' +
    this?.name?.lastName
  );
});

// filtering out delate document

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// checking if user is Existing
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};
export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
