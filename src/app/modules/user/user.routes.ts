import express from "express";
import checkValidation from "../../middleware/checkValidation";
import { createStudentValidationSchema } from "../student/student.validation";
import { createStudentController } from "./user.controller";

const router = express.Router();

// you can create a new student hit this route
router.post(
    "/create-student",
    checkValidation(createStudentValidationSchema),
    createStudentController,
);

export const userRouter = router;
