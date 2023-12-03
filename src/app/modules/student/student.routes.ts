import { Router } from "express";
import {
    deleteStudentController,
    getAllStudentController,
    getSingleStudentController,
    updateStudentController,
} from "./student.controller";

const studentRoutes = Router();

//get all student route
studentRoutes.get("/", getAllStudentController);

// get single student route
studentRoutes.get("/:id", getSingleStudentController);

// update a single student route
studentRoutes.patch(
    "/:id",
    // checkValidation(updateStudentValidationSchema),
    updateStudentController,
);

// this route hit to you can delete a student by id
studentRoutes.delete("/:id", deleteStudentController);

export default studentRoutes;
