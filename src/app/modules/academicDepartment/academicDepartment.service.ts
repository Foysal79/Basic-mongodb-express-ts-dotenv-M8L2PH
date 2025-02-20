import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";



const createAcademicDepartmentInoDB = async(payload : TAcademicDepartment) => {

    // const isDepartmentExist = await AcademicDepartment.findOne({name : payload.name})
    // if(isDepartmentExist){
    //     throw new Error('Department already exist');
    // }
    const result = await AcademicDepartment.create(payload);
    return result
}

const getAllAcademicDepartmentFromDB = async() => {
    const result = await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentFromDB = async(id : string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

const UpdateAcademicDepartmentFromDB = async(id : string, payload : Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(
        {_id : id}, 
        payload, 
        { new : true});
        return result;
}

export const academicDepartmentService = {
    createAcademicDepartmentInoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    UpdateAcademicDepartmentFromDB
}