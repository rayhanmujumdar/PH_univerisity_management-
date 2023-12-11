import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    assignCourseWithFacultyService,
    createCourseService,
    deleteCourseService,
    getASingleCourseService,
    getAllCourseService,
    removeCourseWithFacultyService,
    updateCourseService,
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
    const courseData = req.body;
    const result = await updateCourseService(id, courseData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "fetch a single successfully",
        data: result,
    });
});

// assign new course faculty

export const assignCourseWithFacultyController = catchAsync(
    async (req, res) => {
        const { courseId } = req.params;
        const { faculties } = req.body;
        const result = await assignCourseWithFacultyService(
            courseId,
            faculties,
        );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "faculties updated successfully",
            data: result,
        });
    },
);

// remove course faculty into course
export const removeCourseWithFacultyController = catchAsync(
    async (req, res) => {
        const { courseId } = req.params;
        const { faculties } = req.body;
        const result = await removeCourseWithFacultyService(
            courseId,
            faculties,
        );
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "faculties updated successfully",
            data: result,
        });
    },
);

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
