import { Schema } from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";



const userNameSchema = new Schema<TUserName>({
    firstName : {
        type: String,
        required: [true, "First name Must be required"],
        trim : true,
        maxlength : [20, 'Name can not be more than 20 character'],
    } ,
    middleName : {
        type : String,
        trim : true,
    },
    lastName : {
        type : String,
        trim : true,
        required : [true, "Last Name is must be required"],
        maxlength : [20, 'Name can not be more than 20 character'],
    }
})

const facultySchema = new Schema<TFaculty, FacultyModel>({
    id : {
        type : String,
        required : [true, "Faculty id is must be required"],
        unique : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        unique : true,
    },
    designation : {
        type : String,
        required : [true, "Designation is must be required"],
    },
    name : {
        type : userNameSchema,
        required : [true, "Name is must be required"],
    },
    gender : {
        type : String,
        enum : {
            values : Gender,
            message : " {VALUE} this Gender is not valid"
        },
        required : [true, "Gender is Required must be "]
    },
    dateOfBirth : {
        type : String,
    },
    email : {
        type : String,
        required : [true, "Email is must be required"],
    },
    contactNo : {
        type : String,
        required : [true, "Contact no must be required"],
    },
    emergencyContactNo : {
        type : String,
        required : [true, "emergency Contact No is Not be Required"]
    },
    bloodGroup : {
        type :  String,
        enum : {
            values : BloodGroup,
            message : " {VALUE} this Blood Group is not valid"
        },
    },
    presentAddress : {
        type : String,
        required : [true, " Present Address is Required"],
    },
    permanentAddress : {
        type : String,
        required : [true, 'present Address is Must be Required']
    },
    profileImg : {
        type : String,
        required : [true, "Profile Is must be Required"],
    },
    academicDepartment : {
        type : Schema.Types.ObjectId,
        ref : 'AcademicDepartment',
        required : [true, "Academic Department Is Must be Required"]
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {
    toJSON : {
        virtuals : true
    }
})