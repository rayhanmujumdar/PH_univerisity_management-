import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    createOfferedCourseController,
    updateOfferedCourseController,
} from "./offeredCourse.controller";
import {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
} from "./offeredCourse.validation";

const offeredCourseRoutes = Router();

// create a new offered course route
offeredCourseRoutes.post(
    "/create-offered-course",
    checkValidation(createOfferedCourseValidationSchema),
    createOfferedCourseController,
);
// update a offered course route
offeredCourseRoutes.patch(
    "/:id",
    checkValidation(updateOfferedCourseValidationSchema),
    updateOfferedCourseController,
);

export default offeredCourseRoutes;
