"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicDepartmentService = exports.getSingleAcademicDepartmentService = exports.getAllAcademicDepartmentService = exports.createAcademicDepartmentService = void 0;
const academicDepartment_model_1 = __importDefault(require("./academicDepartment.model"));
// create a new academic department service
const createAcademicDepartmentService = (payload) => {
    return academicDepartment_model_1.default.create(payload);
};
exports.createAcademicDepartmentService = createAcademicDepartmentService;
// get all academic department service
const getAllAcademicDepartmentService = () => {
    return academicDepartment_model_1.default.find();
};
exports.getAllAcademicDepartmentService = getAllAcademicDepartmentService;
// get a single academic department service
const getSingleAcademicDepartmentService = (departmentId) => {
    return academicDepartment_model_1.default.findById(departmentId);
};
exports.getSingleAcademicDepartmentService = getSingleAcademicDepartmentService;
// update a single academic department service
const updateAcademicDepartmentService = (departmentId, payload) => {
    return academicDepartment_model_1.default.findByIdAndUpdate(departmentId, payload, {
        new: true,
    });
};
exports.updateAcademicDepartmentService = updateAcademicDepartmentService;
