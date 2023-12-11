import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    createCourseController,
    deleteCourseController,
    getAllCourseController,
    getSingleCourseController,
    updateCourseController,
} from "./course.controller";
import {
    createCourseValidationSchema,
    updateCourseValidationSchema,
} from "./course.validation";

const courseRoutes = Router();

// create a course route
courseRoutes.post(
    "/create-course",
    checkValidation(createCourseValidationSchema),
    createCourseController,
);

// get all course route
courseRoutes.get("/", getAllCourseController);

// get a single course route
courseRoutes.get("/:id", getSingleCourseController);

// update course route
courseRoutes.patch(
    "/:id",
    checkValidation(updateCourseValidationSchema),
    updateCourseController,
);

// delete course route
courseRoutes.delete("/:id", deleteCourseController);

export default courseRoutes;
