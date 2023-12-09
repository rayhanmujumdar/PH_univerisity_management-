import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    deleteFacultyController,
    getAllFacultyController,
    getSingleFacultyController,
    updateFacultyController,
} from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";

const facultyRoutes = Router();

// get all faculty route
facultyRoutes.get("/", getAllFacultyController);

// get single faculty route
facultyRoutes.get("/:id", getSingleFacultyController);

// update faculty route
facultyRoutes.patch(
    "/:id",
    checkValidation(updateFacultyValidationSchema),
    updateFacultyController,
);

// delete faculty route
facultyRoutes.delete("/:id", deleteFacultyController);

export default facultyRoutes
