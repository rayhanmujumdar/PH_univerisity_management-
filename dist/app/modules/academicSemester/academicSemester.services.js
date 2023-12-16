"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateASingleAcademicSemesterService = exports.getSingleAcademicSemesterService = exports.getAllAcademicSemesterService = exports.createAcademicSemesterService = void 0;
const error_1 = __importDefault(require("../../ErrorBoundary/error"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = __importDefault(require("./academicSemester.model"));
// create a new academic semester
const createAcademicSemesterService = (semesterData) => {
    if (academicSemester_constant_1.semesterCodeAndNameMatchMapping[semesterData.name] !== semesterData.code) {
        throw error_1.default(500, "invalid semester code");
    }
    return academicSemester_model_1.default.create(semesterData);
};
exports.createAcademicSemesterService = createAcademicSemesterService;
// get all academic semester service
const getAllAcademicSemesterService = () => {
    return academicSemester_model_1.default.find({});
};
exports.getAllAcademicSemesterService = getAllAcademicSemesterService;
// get a single academic semester service
const getSingleAcademicSemesterService = (id) => {
    return academicSemester_model_1.default.findById(id);
};
exports.getSingleAcademicSemesterService = getSingleAcademicSemesterService;
// update a single academic semester service
const updateASingleAcademicSemesterService = (id, semesterData) => {
    if (semesterData.name &&
        semesterData.code &&
        academicSemester_constant_1.semesterCodeAndNameMatchMapping[semesterData.name] !== semesterData.code) {
        throw error_1.default(500, "invalid semester code");
    }
    return academicSemester_model_1.default.findByIdAndUpdate(id, semesterData);
};
exports.updateASingleAcademicSemesterService = updateASingleAcademicSemesterService;
