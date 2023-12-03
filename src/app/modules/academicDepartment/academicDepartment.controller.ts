import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import { AppError } from "../../lib/error";
import sendResponse from "../../lib/sendResponse";
import {
    createAcademicDepartmentService,
    getAllAcademicDepartmentService,
    getSingleAcademicDepartmentService,
    updateAcademicDepartmentService,
} from "./academicDepartment.services";

// create new academic department controller
export const createAcademicDepartmentController = catchAsync(
    async (req, res) => {
        const departmentData = req.body;
        const result = await createAcademicDepartmentService(departmentData);
        sendResponse(res, {
            success: true,
            message: "new academic department created successfully ",
            statusCode: httpStatus.CREATED,
            data: result,
        });
    },
);
// get all academic department controller
export const getAllAcademicDepartmentController = catchAsync(
    async (_req, res) => {
        const result = await getAllAcademicDepartmentService();
        sendResponse(res, {
            success: true,
            message: "fetch all academic department",
            statusCode: httpStatus.CREATED,
            data: result,
        });
    },
);
// get single academic department controller
export const getSingleAcademicDepartmentController = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const result = await getSingleAcademicDepartmentService(id);
        if (!result)
            throw new AppError(
                httpStatus.NOT_FOUND,
                "academic department are not found",
            );
        sendResponse(res, {
            success: true,
            message: "fetch a single academic department",
            statusCode: httpStatus.CREATED,
            data: result,
        });
    },
);

// update academic department controller
export const updateAcademicDepartmentController = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const departmentData = req.body;
        const result = await updateAcademicDepartmentService(
            id,
            departmentData,
        );
        sendResponse(res, {
            success: true,
            message: "update academic department are successful",
            statusCode: httpStatus.CREATED,
            data: result,
        });
    },
);
