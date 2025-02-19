import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";



const createAcademicDepartment = async(payload : TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result
}

const getAllAcademicDepartment = async() => {
    const result = await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartment = async(id : string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

const UpdateAcademicDepartment = async(id : string, payload : Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(
        {_id : id}, 
        payload, 
        { new : true});
        return result;
}

export const createAcademicDepartmentService = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    UpdateAcademicDepartment
}