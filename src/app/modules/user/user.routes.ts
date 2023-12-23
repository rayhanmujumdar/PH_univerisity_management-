import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { USER_ROLE } from "./user.constant";
import {
    changeStatusController,
    createAdminController,
    createFacultyController,
    createStudentController,
    getMeController,
} from "./user.controller";
import { changeStatusValidationSchema } from "./user.validatin";

const upload = multer({ dest: path.join(process.cwd(), "/uploads/") });

const router = express.Router();

// you can create a new student hit this route
router.post(
    "/create-student",
    auth(USER_ROLE.admin),
    upload.single("files"),
    (req: Request, _res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
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
// get me route
router.get("/me", auth("student", "faculty", "admin"), getMeController);

// change status
router.patch(
    "/change-status/:id",
    auth("admin"),
    checkValidation(changeStatusValidationSchema),
    changeStatusController,
);

export const userRouter = router;
