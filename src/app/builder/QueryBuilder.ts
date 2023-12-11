/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

export default class QueryBuilder<T> {
    constructor(
        public modelQuery: Query<T[], T>,
        public query: Record<string, unknown>,
    ) {}
    search(searchAbleField: string[]) {
        const searchQuery = this.query?.searchTerm || "";
        this.modelQuery = this.modelQuery.find({
            $or: searchAbleField.map((field: string) => {
                return {
                    [field]: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                };
            }),
        } as FilterQuery<T>);
        return this;
    }
    filter() {
        const queryObj = { ...this.query };
        const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeField.forEach((el) => {
            delete queryObj[el];
        });
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }
    sort() {
        const sortItem = (this.query?.sort as string) || "-createdAt";
        const sortedFieldName = sortItem.split(",").join(" ");
        this.modelQuery = this.modelQuery.sort(sortedFieldName);
        return this;
    }
    limit() {
        const limit = Number(this.query?.limit) || 0;
        this.modelQuery = this.modelQuery.limit(limit);
        return this;
    }
    skip() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip);
        return this;
    }
    fields() {
        const fields = (this.query?.fields as string) || "";
        const refineFieldsName = fields.split(",").join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(refineFieldsName);
        return this;
    }
}
