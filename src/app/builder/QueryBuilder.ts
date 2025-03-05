import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, nuKnown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, nuKnown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObject[el]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  Pagination() {
    const limit = Number(this.query.limit) || 10;
    const page = Number(this.query.page) || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  //* Filed searching or limiting if normal string given else -string will be this sting without given
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
