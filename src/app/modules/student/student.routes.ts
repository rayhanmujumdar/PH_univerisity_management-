import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    getAllStudentController,
    getSingleStudentController,
    updateStudentController,
} from "./student.controller";
import { updateStudentValidationSchema } from "./student.validation";

const studentRoutes = Router();

//get all student route
studentRoutes.get("/", getAllStudentController);

// get single student route
studentRoutes.get("/:id", getSingleStudentController);

// update a single student route
studentRoutes.patch(
    "/:id",
    checkValidation(updateStudentValidationSchema),
    updateStudentController,
);

export default studentRoutes;
