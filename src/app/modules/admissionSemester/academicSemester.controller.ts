import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createAcademicSemesterService,
    getAllAcademicSemesterService,
    getSingleAcademicSemesterService,
    updateASingleAcademicSemesterService,
} from "./academicSemester.services";

// create new academic semester
export const createAcademicSemesterController = catchAsync(async (req, res) => {
    const academicSemesterData = req.body;
    const newAcademicSemesterData =
        await createAcademicSemesterService(academicSemesterData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "academic semester created successfully",
        data: newAcademicSemesterData,
    });
});

// get all academic semester controller
export const getAllAcademicSemesterController = catchAsync(async (req, res) => {
    const result = await getAllAcademicSemesterService();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "get all academic semester successfully",
        data: result,
    });
});
// get a single academic semester controller
export const getASingleAcademicSemesterController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await getSingleAcademicSemesterService(id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "get a single academic semester  successfully",
            data: result,
        });
    },
);
// update academic semester controller
export const updateASingleAcademicSemesterController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const semesterData = req.body;
        const result = await updateASingleAcademicSemesterService(
            id,
            semesterData,
        );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "update academic semester successfully",
            data: result,
        });
    },
);
