"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleAcademicFacultyService = exports.getSingleAcademicFacultyService = exports.getAllAcademicFacultyService = exports.createAcademicFacultyService = void 0;
const academicFaculty_model_1 = __importDefault(require("./academicFaculty.model"));
// create a new academic faculty
const createAcademicFacultyService = (payload) => {
    return academicFaculty_model_1.default.create(payload);
};
exports.createAcademicFacultyService = createAcademicFacultyService;
// get all academic faculty
const getAllAcademicFacultyService = () => {
    return academicFaculty_model_1.default.find();
};
exports.getAllAcademicFacultyService = getAllAcademicFacultyService;
// get single academic faculty
const getSingleAcademicFacultyService = (facultyId) => {
    return academicFaculty_model_1.default.findById(facultyId);
};
exports.getSingleAcademicFacultyService = getSingleAcademicFacultyService;
// update Academic faculty
const updateSingleAcademicFacultyService = (facultyId, payload) => {
    return academicFaculty_model_1.default.findByIdAndUpdate(facultyId, payload);
};
exports.updateSingleAcademicFacultyService = updateSingleAcademicFacultyService;
