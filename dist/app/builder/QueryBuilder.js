"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchAbleField) {
        var _a;
        const searchQuery = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) || "";
        this.modelQuery = this.modelQuery.find({
            $or: searchAbleField.map((field) => {
                return {
                    [field]: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                };
            }),
        });
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeField.forEach((el) => {
            delete queryObj[el];
        });
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sortItem = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) || "-createdAt";
        const sortedFieldName = sortItem.split(",").join(" ");
        this.modelQuery = this.modelQuery.sort(sortedFieldName);
        return this;
    }
    limit() {
        var _a;
        const limit = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) || 0;
        this.modelQuery = this.modelQuery.limit(limit);
        return this;
    }
    skip() {
        var _a, _b;
        const page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip);
        return this;
    }
    fields() {
        var _a;
        const fields = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) || "";
        const refineFieldsName = fields.split(",").join(" ") || "-__v";
        this.modelQuery = this.modelQuery.select(refineFieldsName);
        return this;
    }
}
exports.default = QueryBuilder;
