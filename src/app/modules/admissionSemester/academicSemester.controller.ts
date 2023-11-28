import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createAcademicSemesterService } from "./academicSemester.services";

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
