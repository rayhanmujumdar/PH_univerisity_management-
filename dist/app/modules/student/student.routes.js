"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const studentRoutes = express_1.Router();
//get all student route
studentRoutes.get("/", student_controller_1.getAllStudentController);
// get single student route
studentRoutes.get("/:id", student_controller_1.getSingleStudentController);
// update a single student route
studentRoutes.patch("/:id", 
// checkValidation(updateStudentValidationSchema),
student_controller_1.updateStudentController);
// this route hit to you can delete a student by id
studentRoutes.delete("/:id", student_controller_1.deleteStudentController);
exports.default = studentRoutes;
