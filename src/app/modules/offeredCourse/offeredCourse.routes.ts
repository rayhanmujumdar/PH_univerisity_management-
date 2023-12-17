import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import { createOfferedCourseController } from "./offeredCourse.controller";
import { createOfferedCourseValidationSchema } from "./offeredCourse.validation";

const offeredCourseRoutes = Router();

// create a new offered course route
offeredCourseRoutes.post(
    "/create-offered-course",
    checkValidation(createOfferedCourseValidationSchema),
    createOfferedCourseController,
);

export default offeredCourseRoutes;
