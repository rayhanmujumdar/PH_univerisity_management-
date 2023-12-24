import { Router } from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { createEnrollCourseController } from "./enrollCourse.controller";
import { createEnrollCourseValidationSchema } from "./enrollCourse.validation";

const enrollCourseRouter = Router();

// course enroll create route
enrollCourseRouter.post(
    "/create-enroll-course",
    auth("student"),
    checkValidation(createEnrollCourseValidationSchema),
    createEnrollCourseController,
);

export default enrollCourseRouter;
