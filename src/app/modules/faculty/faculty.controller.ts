import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    deleteFacultyService,
    getAllFacultyService,
    getSingleFacultyService,
    updateFacultyService,
} from "./faculty.services";

// get all faculty controller
export const getAllFacultyController = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await getAllFacultyService(query);
    sendResponse(res, {
        success: true,
        message: "fetch faculty data successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
// get single faculty controller
export const getSingleFacultyController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await getSingleFacultyService(id);
    sendResponse(res, {
        success: true,
        message: "fetch a single faculty data successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
// update single faculty controller
export const updateFacultyController = catchAsync(async (req, res) => {
    const id = req.params?.id;
    const facultyData = req.body;
    const result = await updateFacultyService(id, facultyData);
    sendResponse(res, {
        success: true,
        message: "update faculty data successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
// delete single faculty controller
export const deleteFacultyController = catchAsync(async (req, res) => {
    const id = req.params?.id;
    const result = await deleteFacultyService(id);
    sendResponse(res, {
        success: true,
        message: "delete faculty data successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
