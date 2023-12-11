import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    createCourseService,
    deleteCourseService,
    getASingleCourseService,
    getAllCourseService,
} from "./course.services";

export const createCourseController = catchAsync(async (req, res) => {
    const data = req.body;
    const result = await createCourseService(data);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Course create successfully",
        data: result,
    });
});

export const getAllCourseController = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await getAllCourseService(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "fetch all courses successfully",
        data: result,
    });
});

export const getSingleCourseController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await getASingleCourseService(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "fetch a single successfully",
        data: result,
    });
});
export const updateCourseController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await getASingleCourseService(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "fetch a single successfully",
        data: result,
    });
});

export const deleteCourseController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await deleteCourseService(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "delete course successfully",
        data: result,
    });
});
