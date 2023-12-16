import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import {
    createSemesterRegistrationController,
    deleteSemesterRegistrationController,
    getAllSemesterRegistrationController,
    getSingleSemesterRegistrationController,
    updateSemesterRegistrationController,
} from "./semesterRegistration.controller";
import {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
} from "./semesterRegistration.validation";

const semesterRegistrationRoutes = Router();
// create a semester registration route
semesterRegistrationRoutes.get(
    "/create-semester-registration",
    checkValidation(createSemesterRegistrationValidationSchema),
    createSemesterRegistrationController,
);
// get all semester registration route
semesterRegistrationRoutes.get("/", getAllSemesterRegistrationController);
// get a single semester registration route
semesterRegistrationRoutes.get("/:id", getSingleSemesterRegistrationController);
// update a semester registration route
semesterRegistrationRoutes.patch(
    "/:id",
    checkValidation(updateSemesterRegistrationValidationSchema),
    updateSemesterRegistrationController,
);

// delete a semester registration route
semesterRegistrationRoutes.delete("/:id", deleteSemesterRegistrationController);

export default semesterRegistrationRoutes;
