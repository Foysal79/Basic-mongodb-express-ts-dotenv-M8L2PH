import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id : {type : String, required : true},
    password : {type : String, required : true},
    needPasswordChange : {type : Boolean, default : true },
    role : {type : String, enum : ['admin', 'student', 'faculty']},
    isDeleted : {type : Boolean, default : false},
    status : {type : String, enum : ['in-progress', 'blocked']},
    

},
{
    timestamps : true,
}
)
//* const User = model<IUser, UserModel>('User', schema);

export const userModel = model<TUser>('userdata', userSchema)