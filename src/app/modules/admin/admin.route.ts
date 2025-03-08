import express from 'express';
import { Router } from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../middlwares/validateRequest';
import { AdminValidations } from './admin.validation';

const router = express.Router();
// get all admin data
router.get('/', AdminController.getAllAdmins);
// get single admin data
router.get('/:id', AdminController.getSingleAdmin);
//admin update
router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminController.updateAdmin,
);
//admin delete
router.delete('/:id', AdminController.deletedAdmin);

export const AdminRoutes = router;
