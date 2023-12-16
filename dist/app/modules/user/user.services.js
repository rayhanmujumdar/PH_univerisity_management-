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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFacultyIntoDB = exports.createStudentIntoDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importStar(require("../../ErrorBoundary/error"));
const config_1 = __importDefault(require("../../config"));
const academicSemester_model_1 = __importDefault(require("../academicSemester/academicSemester.model"));
const faculty_model_1 = __importDefault(require("../faculty/faculty.model"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utilis_1 = require("./user.utilis");
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // create a transaction session
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // create a new user
        const userData = {};
        const semesterData = yield academicSemester_model_1.default.findById(studentData.academicSemester);
        if (!semesterData) {
            throw error_1.default(500, "semester not found");
        }
        userData.password = password
            ? password
            : config_1.default.default_password;
        const isExistEmailIntoDB = yield user_utilis_1.duplicateEmailCheck(studentData.email, student_model_1.Student.find());
        if (isExistEmailIntoDB) {
            throw error_1.default(500, "Email already exist");
        }
        userData.role = "student";
        // set manually generated id
        userData.id = yield user_utilis_1.generateStudentId(semesterData);
        // create a user (transaction - 1)
        const newUser = yield user_model_1.User.create([userData], { session });
        // const newUser = await User.create(userData);
        if (!newUser.length) {
            throw new error_1.AppError(http_status_1.default.BAD_REQUEST, "failed to create user");
        }
        studentData.id = newUser[0].id;
        studentData.userId = newUser[0]._id;
        // create a student (transaction - 2)
        const [newStudent] = yield student_model_1.Student.create([studentData], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
exports.createStudentIntoDB = createStudentIntoDB;
const createFacultyIntoDB = (password, faculty) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userData = {};
        userData.role = "faculty";
        userData.password = password ? password : config_1.default.default_password;
        userData.id = yield user_utilis_1.generateUserId("faculty");
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new error_1.AppError(http_status_1.default.BAD_REQUEST, "faculty created failed");
        }
        faculty.id = newUser[0].id;
        faculty.userId = newUser[0]._id;
        const isExistEmailIntoDB = yield user_utilis_1.duplicateEmailCheck(faculty === null || faculty === void 0 ? void 0 : faculty.email, faculty_model_1.default.find());
        if (isExistEmailIntoDB) {
            throw error_1.default(500, "Email already exist");
        }
        const [newFaculty] = yield faculty_model_1.default.create([faculty], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new error_1.AppError(http_status_1.default.INTERNAL_SERVER_ERROR, err.message);
    }
});
exports.createFacultyIntoDB = createFacultyIntoDB;
