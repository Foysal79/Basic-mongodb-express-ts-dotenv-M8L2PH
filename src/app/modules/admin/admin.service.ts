import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
  .search(
    AdminSearchableFields,
  )
  .filter()
  .sort()
  .Pagination()
  .fields()

  const result = await adminQuery.modelQuery;
  return result;
};

export const AdminServices = {
    getAllAdminFromDB
  };