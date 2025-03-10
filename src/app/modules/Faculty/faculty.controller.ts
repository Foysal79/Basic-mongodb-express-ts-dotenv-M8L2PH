import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import httpStatus from 'http-status';


const getAllFaculty =  catchAsync(
    async (req, res, next) => {
        const result = await FacultyServices.getAllFacultiesFromDB(req.query);
        sendResponse(res, {
            statusCode : httpStatus.OK,
            success : true,
            message : "Faculty list fetched successfully",
            data : result
        })

    }
)

const getSingleFaculty = catchAsync(
    async (req, res) => {
        const {id} = req.params
        const result = await FacultyServices.getSingleFacultyFromDB(id);
         sendResponse(res, {
            statusCode : httpStatus.OK,
            success : true,
            message : "single Faculty details fetched successfully",
            data : result
         })
    }
)

const updateFaculty = catchAsync(
    async (req, res) => {
        const {id} = req.params;
        const {faculty} = req.body
        const result = await FacultyServices.updateFacultyIntoDB(id, faculty);
        sendResponse(res, {
            statusCode : httpStatus.OK,
            success : true,
            message : "Faculty Data updated successfully",
            data : result
        })
    }
)

const deletedFaculty = catchAsync(
    async (req, res) => {
     const {id} = req.params
     const result = await FacultyServices.deleteFacultyFromDB(id);
     sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "Faculty deleted successfully",
        data : result
     })
    }
)

export const FacultyController = {
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deletedFaculty
}