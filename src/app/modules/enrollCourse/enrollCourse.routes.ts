import { Router } from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import {
    createEnrollCourseController,
    updateEnrollCourseController,
} from "./enrollCourse.controller";
import {
    createEnrollCourseValidationSchema,
    updateEnrollCourseValidationSchema,
} from "./enrollCourse.validation";

const enrollCourseRouter = Router();

// course enroll create route
enrollCourseRouter.post(
    "/create-enroll-course",
    auth("student"),
    checkValidation(createEnrollCourseValidationSchema),
    createEnrollCourseController,
);

// course enroll create route
enrollCourseRouter.patch(
    "/update-enroll-course",
    auth("faculty"),
    checkValidation(updateEnrollCourseValidationSchema),
    updateEnrollCourseController,
);

export default enrollCourseRouter;
