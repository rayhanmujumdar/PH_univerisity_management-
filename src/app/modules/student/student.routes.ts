import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import {
    deleteStudentController,
    getAllStudentController,
    getSingleStudentController,
    updateStudentController,
} from "./student.controller";

const studentRoutes = Router();

//get all student route
studentRoutes.get("/", auth(USER_ROLE.student), getAllStudentController);

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
