import express from "express";
import checkValidation from "../../middleware/checkValidation";
import { createStudentValidationSchema } from "../student/student.validation";
import { createStudentController , createFacultyController } from "./user.controller";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";

const router = express.Router();

// you can create a new student hit this route
router.post(
    "/create-student",
    checkValidation(createStudentValidationSchema),
    createStudentController,
);

// create a new faculty
router.post(
    "/create-faculty",
    checkValidation(createFacultyValidationSchema),
    createFacultyController
)

export const userRouter = router;
