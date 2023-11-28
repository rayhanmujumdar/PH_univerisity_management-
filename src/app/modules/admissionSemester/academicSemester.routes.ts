import { Router } from "express";
import { createAcademicSemesterController } from "./academicSemester.controller";
import checkValidation from "../../middleware/checkValidation";
import { createAdmissionSemesterValidationSchema } from "./admissionSemester.validation";

const router = Router();

// create a semester for a student

router.post(
    "/create-academic-semester",
    checkValidation(createAdmissionSemesterValidationSchema),
    createAcademicSemesterController,
);

export const academicSemesterRoutes = router;
