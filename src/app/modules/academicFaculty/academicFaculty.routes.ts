import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    createAcademicFacultyController,
    getAllAcademicFacultyController,
    getSingleAcademicFacultyController,
    updateAcademicFacultyController,
} from "./academicFaculty.controller";
import {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation,
} from "./academicFaculty.validation";

const academicFacultyRoutes = Router();

// create academic faculty route
academicFacultyRoutes.post(
    "/create-academic-faculty",
    checkValidation(createAcademicFacultyValidation),
    createAcademicFacultyController,
);
// get all academic faculty route
academicFacultyRoutes.get("/", getAllAcademicFacultyController);
//get single academic faculty route
academicFacultyRoutes.get("/:id", getSingleAcademicFacultyController);
// update academic faculty route
academicFacultyRoutes.patch(
    "/:id",
    checkValidation(updateAcademicFacultyValidation),
    updateAcademicFacultyController,
);
export default academicFacultyRoutes;
