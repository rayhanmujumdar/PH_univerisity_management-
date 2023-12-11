import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    assignCourseWithFacultyController,
    createCourseController,
    deleteCourseController,
    getAllCourseController,
    getSingleCourseController,
    removeCourseWithFacultyController,
    updateCourseController,
} from "./course.controller";
import {
    courseWithFacultyValidationSchema,
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

// assign course faculties route
courseRoutes.put(
    "/:courseId/assign-faculties",
    checkValidation(courseWithFacultyValidationSchema),
    assignCourseWithFacultyController,
);

// remove course faculties route
courseRoutes.delete(
    "/:courseId/remove-faculties",
    checkValidation(courseWithFacultyValidationSchema),
    removeCourseWithFacultyController,
);

// delete course route
courseRoutes.delete("/:id", deleteCourseController);

export default courseRoutes;
