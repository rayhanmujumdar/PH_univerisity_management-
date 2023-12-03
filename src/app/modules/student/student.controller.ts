import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    deleteStudentService,
    getAllStudentService,
    getSingleStudentService,
    updateStudentService,
} from "./student.services";

// get all student controller
export const getAllStudentController = catchAsync(async (req, res) => {
    const result = await getAllStudentService();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All student fetch successfully",
        data: result,
    });
});

// get single student controller
export const getSingleStudentController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await getSingleStudentService(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "student fetch successfully",
        data: result,
    });
});

// update a single student controller
export const updateStudentController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const studentData = req.body;
    const result = await updateStudentService(id, studentData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Student updated successfully",
        data: result,
    });
});

// delete student controller
export const deleteStudentController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await deleteStudentService(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "student deleted successfully ",
        data: result,
    });
});
