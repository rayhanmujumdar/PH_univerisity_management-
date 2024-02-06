import { Router } from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import {
    createAcademicSemesterController,
    getASingleAcademicSemesterController,
    getAllAcademicSemesterController,
    updateASingleAcademicSemesterController,
} from "./academicSemester.controller";
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
router.get("/", auth("admin"), getAllAcademicSemesterController);
// get single academic semester
router.get("/:id", auth("admin"), getASingleAcademicSemesterController);
// update academic semester
router.patch(
    "/:id",
    checkValidation(updateAdmissionSemesterValidationSchema),
    updateASingleAcademicSemesterController,
);

export const academicSemesterRoutes = router;
