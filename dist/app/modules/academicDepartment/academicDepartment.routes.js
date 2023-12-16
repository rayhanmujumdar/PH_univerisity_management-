"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middleware/checkValidation"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartmentRoutes = express_1.Router();
// create academic department route
academicDepartmentRoutes.post("/create-academic-department", 
// checkValidation(createAcademicDepartmentValidation),
academicDepartment_controller_1.createAcademicDepartmentController);
// get all academic department route
academicDepartmentRoutes.get("/", academicDepartment_controller_1.getAllAcademicDepartmentController);
// get single academic department route
academicDepartmentRoutes.get("/:id", academicDepartment_controller_1.getSingleAcademicDepartmentController);
// update academic department route
academicDepartmentRoutes.patch("/:id", checkValidation_1.default(academicDepartment_validation_1.updateAcademicDepartmentValidation), academicDepartment_controller_1.updateAcademicDepartmentController);
exports.default = academicDepartmentRoutes;
