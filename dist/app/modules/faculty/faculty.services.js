"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFacultyService = exports.updateFacultyService = exports.getSingleFacultyService = exports.getAllFacultyService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../ErrorBoundary/error");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const faculty_constent_1 = require("./faculty.constent");
const faculty_model_1 = __importDefault(require("./faculty.model"));
// get all faculty
const getAllFacultyService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = new QueryBuilder_1.default(faculty_model_1.default.find()
        .populate({
        path: "academicDepartment",
        populate: { path: "academicFaculty" },
    })
        .populate("academicFaculty"), query)
        .search(faculty_constent_1.facultySearchableField)
        .filter()
        .sort()
        .limit()
        .skip()
        .fields();
    const result = yield facultyData.modelQuery;
    return result;
});
exports.getAllFacultyService = getAllFacultyService;
// get single faculty
const getSingleFacultyService = (id) => {
    return faculty_model_1.default.findById(id);
};
exports.getSingleFacultyService = getSingleFacultyService;
// update a single faculty
const updateFacultyService = (id, updatedData) => {
    const { name } = updatedData, remaining = __rest(updatedData, ["name"]);
    const facultyUpdatedData = Object.assign({}, remaining);
    if (name) {
        Object.entries(name).forEach(([key, val]) => {
            facultyUpdatedData[`name.${key}`] = val;
        });
    }
    return faculty_model_1.default.findByIdAndUpdate(id, facultyUpdatedData, { new: true });
};
exports.updateFacultyService = updateFacultyService;
// delete faculty
const deleteFacultyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteFacultyUser = yield user_model_1.User.updateOne({ id }, { isDeleted: true });
        if (!deleteFacultyUser.modifiedCount &&
            !deleteFacultyUser.matchedCount) {
            throw new error_1.AppError(http_status_1.default.BAD_GATEWAY, "faculty user delete failed");
        }
        const deletedFaculty = yield faculty_model_1.default.updateOne({ _id: id }, { isDeleted: true });
        if (!deletedFaculty.modifiedCount && !deletedFaculty.matchedCount) {
            throw new error_1.AppError(http_status_1.default.BAD_GATEWAY, "faculty user delete failed");
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new error_1.AppError(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.deleteFacultyService = deleteFacultyService;
