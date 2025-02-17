import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonths } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";
import sendResponse from "../../utils/sendResponse";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name : {
        type : String,
        required : true,
        enum : AcademicSemesterName
    }, 
    code : {
        type : String,
        required : true,
        enum : AcademicSemesterCode
    },
    year : {
        type : String,
        required : true,
    },
    startMonths : {
        type : String,
        required : true,
        enum : months
    },
    endMonths : {
        type : String,
        required : true,
        enum : months
    }
}, {
    timestamps : true
})


academicSemesterSchema.pre('save', async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        name : this.name,
        year : this.year,
    })

    if(isSemesterExists){
        throw new Error('This Semester Already Exists of the Year ! ')
    }
    next()
})



export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)