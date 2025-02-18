import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async() => {
    const lastStudentId = await User.findOne({
        role : 'student',   // all of student role data given
    }, 
{
    id : 1,   // id given
    _id : 0,  // _id not be given
}).sort({
    createdAt : -1
}).lean();

return lastStudentId?.id ? lastStudentId.id.substring(6) : undefined ;

}




 // year - semesterCode - 4 digit number
 export const generatedStudentID = async (payload : TAcademicSemester) => {
    // first time 0000 padStar 
    const currentId = await findLastStudentId() || (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0') ;

     incrementId = `${payload.year}${payload.code}${incrementId}`

     return incrementId;
 }