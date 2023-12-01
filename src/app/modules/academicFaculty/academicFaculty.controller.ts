import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createAcademicFacultyService,
    getAllAcademicFacultyService,
    getSingleAcademicFacultyService,
    updateSingleAcademicFacultyService,
} from "./academicFaculty.services";

// create a new academic faculty
export const createAcademicFacultyController = catchAsync(async (req, res) => {
    const facultyData = req.body;
    const result = await createAcademicFacultyService(facultyData);
    sendResponse(res, {
        success: true,
        message: "Academic faculty created successfully",
        statusCode: httpStatus.CREATED,
        data: result,
    });
});

// get a new academic faculty
export const getAllAcademicFacultyController = catchAsync(async (_req, res) => {
    const result = await getAllAcademicFacultyService();
    sendResponse(res, {
        success: true,
        message: "get all academic faculty successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

// get a single academic faculty
export const getSingleAcademicFacultyController = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const result = await getSingleAcademicFacultyService(id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "get a single faculty successfully",
            data: result,
        });
    },
);

// update a single academic faculty
export const updateAcademicFacultyController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const facultyData = req.body;
    const result = await updateSingleAcademicFacultyService(id, facultyData);
    sendResponse(res, {
        success: true,
        message: "update academic faculty successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
