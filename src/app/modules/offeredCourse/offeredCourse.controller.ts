import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createOfferedCourseService,
    getAllOfferedCourseService,
    updateOfferedCourseService,
} from "./offeredCourse.services";

// create offered course controller
export const createOfferedCourseController = catchAsync(async (req, res) => {
    const result = await createOfferedCourseService(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "offered course created successfully",
        data: result,
    });
});
// create offered course controller
export const getAllOfferedCourseController = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await getAllOfferedCourseService(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "offered course retrieved successfully",
        data: result,
    });
});

// update offered course controller
export const updateOfferedCourseController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await updateOfferedCourseService(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "offered course updated successfully",
        data: result,
    });
});
