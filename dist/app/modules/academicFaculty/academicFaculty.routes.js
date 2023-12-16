"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middleware/checkValidation"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFacultyRoutes = express_1.Router();
// create academic faculty route
academicFacultyRoutes.post("/create-academic-faculty", checkValidation_1.default(academicFaculty_validation_1.createAcademicFacultyValidation), academicFaculty_controller_1.createAcademicFacultyController);
// get all academic faculty route
academicFacultyRoutes.get("/", academicFaculty_controller_1.getAllAcademicFacultyController);
//get single academic faculty route
academicFacultyRoutes.get("/:id", academicFaculty_controller_1.getSingleAcademicFacultyController);
// update academic faculty route
academicFacultyRoutes.patch("/:id", checkValidation_1.default(academicFaculty_validation_1.updateAcademicFacultyValidation), academicFaculty_controller_1.updateAcademicFacultyController);
exports.default = academicFacultyRoutes;
