import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createFacultyIntoDB, createStudentIntoDB } from "./user.services";

export const createStudentController = catchAsync(async (req, res) => {
    const { password, student } = req.body;
    const newStudentData = await createStudentIntoDB(password, student);
    sendResponse(res, {
        success: true,
        message: "Student created successfully",
        statusCode: httpStatus.CREATED,
        data: newStudentData,
    });
});

export const createFacultyController = catchAsync(async (req, res) => {
    const { password, faculty } = req.body;
    const newFacultyData = await createFacultyIntoDB(password, faculty);
    sendResponse(res, {
        success: true,
        message: "Faculty created successfully",
        statusCode: httpStatus.CREATED,
        data: newFacultyData,
    });
});
