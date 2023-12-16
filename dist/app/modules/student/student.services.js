"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteStudentService = exports.updateStudentService = exports.getSingleStudentService = exports.getAllStudentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importStar(require("../../ErrorBoundary/error"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
// get all student service
const getAllStudentService = (query) => {
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate("academicSemester")
        .populate({
        path: "academicDepartment",
        populate: { path: "academicFacultyId" },
    }), query)
        .search(student_constant_1.studentSearchableField)
        .filter()
        .sort()
        .skip()
        .limit()
        .fields();
    return studentQuery.modelQuery;
    // const queryObj = { ...query };
    // const studentSearchableField = [
    //     "email",
    //     "name.firstName",
    //     "presentAddress",
    // ];
    // let searchQuery = "";
    // if (query?.searchTerm && !query?.email) {
    //     searchQuery = query?.searchTerm as string;
    // }
    // /* mapping output is like is:
    //     {email: {regex: 'rayhan@gmail.com, options: 'i'}}
    //     {'name.firstName': {regex: 'rayhan', options: 'i'}}
    //     {presentAddress: {regex: 'dhaka', options: 'i'}}
    // */
    // const searchQueryStudent = Student.find({
    //     $or: studentSearchableField.map((field) => {
    //         return { [field]: { $regex: searchQuery, $options: "i" } };
    //     }),
    // });
    // // filter
    // const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
    // excludeField.forEach((el) => {
    //     delete queryObj[el];
    // });
    // const filteringWithEmail = searchQueryStudent
    //     .find(queryObj)
    //     .populate("academicSemester")
    //     .populate({
    //         path: "academicDepartment",
    //         populate: {
    //             path: "academicFacultyId",
    //         },
    //     });
    // // sorting
    // let sort = "-createdAt";
    // if (query?.sort) {
    //     sort = query.sort as string;
    // }
    // const sortedStudent = filteringWithEmail.sort(sort);
    // // limit or pagination
    // let limit = 0;
    // if (query?.limit) {
    //     limit = Number(query.limit);
    // }
    // let page = 1;
    // let skip = 0;
    // if (query?.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // const skipQuery = sortedStudent.skip(skip);
    // const limitQuery = skipQuery.limit(limit);
    // // fields filtering
    // let fields = "-__v";
    // if (query?.fields) {
    //     fields = (query?.fields as string).split(",").join(" ");
    // }
    // const fieldsQuery = limitQuery.select(fields);
    // return fieldsQuery;
};
exports.getAllStudentService = getAllStudentService;
// get single student service
const getSingleStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findById(id)
        .populate("academicSemester")
        .populate({
        path: "academicDepartment",
        populate: {
            path: "academicFacultyId",
        },
    });
    if (!student) {
        throw new error_1.AppError(http_status_1.default.NOT_FOUND, "Student does not exist");
    }
    return student;
});
exports.getSingleStudentService = getSingleStudentService;
// update student service
const updateStudentService = (id, payload) => {
    const { name, guardian, localGuardian } = payload, remainingPayload = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifyUpdatedData = Object.assign({}, remainingPayload);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifyUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifyUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifyUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    return student_model_1.Student.findByIdAndUpdate(id, modifyUpdatedData, {
        new: true,
        runValidators: true,
    });
};
exports.updateStudentService = updateStudentService;
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userDeleted = yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!userDeleted)
            throw new error_1.AppError(http_status_1.default.BAD_REQUEST, "student was deleted failed");
        const studentDeleted = yield student_model_1.Student.findOneAndUpdate({ userId: id }, { isDeleted: true }, { new: true, session });
        if (!studentDeleted)
            throw new error_1.AppError(http_status_1.default.BAD_REQUEST, "student was deleted failed");
        yield session.commitTransaction();
        yield session.endSession();
        return studentDeleted;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.deleteStudentService = deleteStudentService;
