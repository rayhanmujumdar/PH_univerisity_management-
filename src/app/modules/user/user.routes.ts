import express from "express";
import { createStudentController } from "./user.controller";
import checkValidation from "../../middleware/checkValidation";
import { studentValidationSchema } from "../student/student.validation";

const router = express.Router();

// you can create a new student hit this route
router.post(
    "/create-student",
    checkValidation(studentValidationSchema),
    createStudentController,
);

export const userRouter = router;
