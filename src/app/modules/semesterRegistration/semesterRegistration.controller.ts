import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createSemesterRegistrationService,
    getAllSemesterRegistrationService,
    getSingleSemesterRegistrationService,
    updateSemesterRegistrationService,
} from "./semesterRegistration";
// create semester registration controller
export const createSemesterRegistrationController = catchAsync(
    async (req, res) => {
        const semesterRegistrationData = req.body;
        const result = await createSemesterRegistrationService(
            semesterRegistrationData,
        );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Semester Registration is created",
            data: result,
        });
    },
);

// get all semester registration controller
export const getAllSemesterRegistrationController = catchAsync(
    async (req, res) => {
        const query = req.query;
        const result = await getAllSemesterRegistrationService(query);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Semester Registration retrieved successfully",
            data: result,
        });
    },
);

// get a single semester registration by id controller
export const getSingleSemesterRegistrationController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await getSingleSemesterRegistrationService(id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Semester Registration retrieved successfully",
            data: result,
        });
    },
);
// update a single semester registration by id controller
export const updateSemesterRegistrationController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const registrationSemesterData = req.body;
        const result = await updateSemesterRegistrationService(
            id,
            registrationSemesterData,
        );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Semester Registration retrieved successfully",
            data: result,
        });
    },
);
// delete a single semester registration by id controller
export const deleteSemesterRegistrationController = catchAsync(async () => {});
