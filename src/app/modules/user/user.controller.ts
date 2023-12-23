import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    changeStatusService,
    createAdminIntoDB,
    createFacultyIntoDB,
    createStudentIntoDB,
    getMeFromDB,
} from "./user.services";
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

// get me controller
export const getMeController = catchAsync(async (req, res) => {
    const { userId, role } = req.decoded;
    const result = await getMeFromDB(userId, role);
    sendResponse(res, {
        success: true,
        message: `${role} retrieved successfully`,
        statusCode: httpStatus.OK,
        data: result,
    });
});

// change user status controller
export const changeStatusController = catchAsync(async (req, res) => {
    const adminId = req.decoded.userId;
    const id = req.params.id;
    const payload = req.body;
    const result = await changeStatusService(id, payload, adminId);
    sendResponse(res, {
        success: true,
        message: `user status updated to ${payload.status}`,
        statusCode: httpStatus.OK,
        data: result,
    });
});
