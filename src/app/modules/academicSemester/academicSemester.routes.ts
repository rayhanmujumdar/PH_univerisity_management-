import { Router } from "express";
import {
    createAcademicSemesterController,
    getASingleAcademicSemesterController,
    getAllAcademicSemesterController,
    updateASingleAcademicSemesterController,
} from "./academicSemester.controller";
import checkValidation from "../../middleware/checkValidation";
import {
    createAdmissionSemesterValidationSchema,
    updateAdmissionSemesterValidationSchema,
} from "./admissionSemester.validation";

const router = Router();

// create a semester for a student

router.post(
    "/create-academic-semester",
    checkValidation(createAdmissionSemesterValidationSchema),
    createAcademicSemesterController,
);

// get all academic semester
router.get("/", getAllAcademicSemesterController);
// get single academic semester
router.get("/:id", getASingleAcademicSemesterController);
// update academic semester
router.patch(
    "/:id",
    checkValidation(updateAdmissionSemesterValidationSchema),
    updateASingleAcademicSemesterController,
);

export const academicSemesterRoutes = router;
