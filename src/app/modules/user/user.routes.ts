import express from "express";
import { createStudentController } from "./user.controller";

const router = express.Router();

// you can create a new student hit this route
router.post("/create-student", createStudentController);

export const userRouter = router;
