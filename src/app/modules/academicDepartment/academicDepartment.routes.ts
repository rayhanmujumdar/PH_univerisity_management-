import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    createAcademicDepartmentController,
    getAllAcademicDepartmentController,
    getSingleAcademicDepartmentController,
    updateAcademicDepartmentController,
} from "./academicDepartment.controller";
import {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation,
} from "./academicDepartment.validation";

const academicDepartmentRoutes = Router();

// create academic department route
academicDepartmentRoutes.post(
    "/create-academic-department",
    checkValidation(createAcademicDepartmentValidation),
    createAcademicDepartmentController,
);
// get all academic department route
academicDepartmentRoutes.get("/", getAllAcademicDepartmentController);
// get single academic department route
academicDepartmentRoutes.get("/:id", getSingleAcademicDepartmentController);
// update academic department route
academicDepartmentRoutes.patch(
    "/:id",
    checkValidation(updateAcademicDepartmentValidation),
    updateAcademicDepartmentController,
);

export default academicDepartmentRoutes;
