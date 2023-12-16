"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoutes = void 0;
const express_1 = require("express");
const academicSemester_controller_1 = require("./academicSemester.controller");
const checkValidation_1 = __importDefault(require("../../middleware/checkValidation"));
const admissionSemester_validation_1 = require("./admissionSemester.validation");
const router = express_1.Router();
// create a semester for a student
router.post("/create-academic-semester", checkValidation_1.default(admissionSemester_validation_1.createAdmissionSemesterValidationSchema), academicSemester_controller_1.createAcademicSemesterController);
// get all academic semester
router.get("/", academicSemester_controller_1.getAllAcademicSemesterController);
// get single academic semester
router.get("/:id", academicSemester_controller_1.getASingleAcademicSemesterController);
// update academic semester
router.patch("/:id", checkValidation_1.default(admissionSemester_validation_1.updateAdmissionSemesterValidationSchema), academicSemester_controller_1.updateASingleAcademicSemesterController);
exports.academicSemesterRoutes = router;
