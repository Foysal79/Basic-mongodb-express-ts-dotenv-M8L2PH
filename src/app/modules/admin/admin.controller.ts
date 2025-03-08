import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
    
});

const updateAdmin = catchAsync(async (req, res) => {});

const deletedAdmin = catchAsync(async (req, res) => {});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deletedAdmin,
};
