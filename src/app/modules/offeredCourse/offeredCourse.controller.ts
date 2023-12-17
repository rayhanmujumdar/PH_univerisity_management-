import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createOfferedCourseService } from "./offeredCourse.services";

export const createOfferedCourseController = catchAsync(async (req, res) => {
    const result = await createOfferedCourseService(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "offered course created successfully",
        data: result,
    });
});
