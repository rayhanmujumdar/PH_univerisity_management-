import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createEnrollCourseService } from "./enrollCourse.services";

export const createEnrollCourseController = catchAsync(async (req, res) => {
    const payload = req.body;
    const userId = req.decoded.userId
    const result = await createEnrollCourseService(userId,payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Course enroll created successfully",
        data: result,
    });
});
