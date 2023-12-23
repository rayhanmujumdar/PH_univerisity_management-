import express from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import {
    createAdminController,
    createFacultyController,
    createStudentController,
} from "./user.controller";
import { createAdminValidationSchema } from "../admin/admin.validation";

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


// create a new admin
router.post(
    "/create-admin",
    // auth(USER_ROLE.admin),
    checkValidation(createAdminValidationSchema),
    createAdminController,
);

export const userRouter = router;
