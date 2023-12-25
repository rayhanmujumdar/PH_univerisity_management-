import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createEnrollCourseService,
    updateEnrollCourseService,
} from "./enrollCourse.services";

// create a enroll course controller
export const createEnrollCourseController = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.decoded.userId;
    const result = await createEnrollCourseService(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Course enroll created successfully",
        data: result,
    });
});

// update a enroll course controller
export const updateEnrollCourseController = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.decoded.userId;
    const id = req.params.id;
    const result = await updateEnrollCourseService(userId, id, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "update Course enroll successfully",
        data: result,
    });
});
