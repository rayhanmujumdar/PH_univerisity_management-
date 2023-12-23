import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createAdminIntoDB, createFacultyIntoDB, createStudentIntoDB } from "./user.services";
// student controller
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

// faculty controller
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

// admin controller
export const createAdminController = catchAsync(async (req, res) => {
    const { password, admin } = req.body;
    const newAdminData = await createAdminIntoDB(password, admin);
    sendResponse(res, {
        success: true,
        message: "admin created successfully",
        statusCode: httpStatus.CREATED,
        data: newAdminData,
    });
});
