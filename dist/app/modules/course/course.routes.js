"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middleware/checkValidation"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const courseRoutes = express_1.Router();
// create a course route
courseRoutes.post("/create-course", checkValidation_1.default(course_validation_1.createCourseValidationSchema), course_controller_1.createCourseController);
// get all course route
courseRoutes.get("/", course_controller_1.getAllCourseController);
// get a single course route
courseRoutes.get("/:id", course_controller_1.getSingleCourseController);
// update course route
courseRoutes.patch("/:id", checkValidation_1.default(course_validation_1.updateCourseValidationSchema), course_controller_1.updateCourseController);
// assign course faculties route
courseRoutes.put("/:courseId/assign-faculties", checkValidation_1.default(course_validation_1.courseWithFacultyValidationSchema), course_controller_1.assignCourseWithFacultyController);
// remove course faculties route
courseRoutes.delete("/:courseId/remove-faculties", checkValidation_1.default(course_validation_1.courseWithFacultyValidationSchema), course_controller_1.removeCourseWithFacultyController);
// delete course route
courseRoutes.delete("/:id", course_controller_1.deleteCourseController);
exports.default = courseRoutes;
