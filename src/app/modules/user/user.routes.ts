import express from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import {
    createFacultyController,
    createStudentController,
} from "./user.controller";

const router = express.Router();

// you can create a new student hit this route
router.post(
    "/create-student",
    auth(USER_ROLE.admin),
    checkValidation(createStudentValidationSchema),
    createStudentController,
);

// create a new faculty
router.post(
    "/create-faculty",
    auth(USER_ROLE.admin),
    checkValidation(createFacultyValidationSchema),
    createFacultyController,
);

export const userRouter = router;
