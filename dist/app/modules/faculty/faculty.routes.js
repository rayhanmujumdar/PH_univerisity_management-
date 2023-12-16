"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middleware/checkValidation"));
const faculty_controller_1 = require("./faculty.controller");
const faculty_validation_1 = require("./faculty.validation");
const facultyRoutes = express_1.Router();
// get all faculty route
facultyRoutes.get("/", faculty_controller_1.getAllFacultyController);
// get single faculty route
facultyRoutes.get("/:id", faculty_controller_1.getSingleFacultyController);
// update faculty route
facultyRoutes.patch("/:id", checkValidation_1.default(faculty_validation_1.updateFacultyValidationSchema), faculty_controller_1.updateFacultyController);
// delete faculty route
facultyRoutes.delete("/:id", faculty_controller_1.deleteFacultyController);
exports.default = facultyRoutes;
