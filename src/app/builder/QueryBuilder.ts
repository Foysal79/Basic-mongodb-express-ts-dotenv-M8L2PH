import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {

    public modelQuery : Query<T[], T>;
    public query : Record<string, nuKnown>;

    constructor(modelQuery : Query<T[], T>, query : Record<string, nuKnown>){
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields : string[]){
        if(this?.query?.searchTerm){
           this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field) => ({
                [field] : {$regex : searchTerm, $options : 'i'},
            }) as FilterQuery<T>),
           })
        }
        return this;
    }

    filter(){
        const queryObject = { ...this.query };
        const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeFields.forEach((el) => delete queryObject[el]);
        this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

        return this;
    }
    
}