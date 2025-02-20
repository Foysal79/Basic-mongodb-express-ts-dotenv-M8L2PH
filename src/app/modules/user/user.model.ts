// import { model, Schema } from "mongoose";
// import { TUser } from "./user.interface";
// import config from "../../config";
// import bcrypt from 'bcrypt';

// const userSchema = new Schema<TUser>({
//     id : {type : String, required : true},
//     password : {type : String, required : true},
//     needPasswordChange : {type : Boolean, default : true },
//     role : {type : String, enum : ['admin', 'student', 'faculty']},
//     isDeleted : {type : Boolean, default : false},
//     status : {type : String, enum : ['in-Progress', 'blocked'], default : "in-Progress"},

// },
// {
//     timestamps : true,
// }
// )

// //* pre save middleware / hook ( password encryption )
// userSchema.pre('save', async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// //* post save middleware / hook ( password hide )
// userSchema.post('save', function (doc, next) {
//   (doc.password = ''), next();
// });

// export const User = model<TUser>('user', userSchema)

import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-Progress', 'blocked'],
    },
  },
  {
    timestamps: true,
  },
);

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

//* pre save middleware / hook
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//* post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('user', userSchema);
