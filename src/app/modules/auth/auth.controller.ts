import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { changePasswordService, logInService } from "./auth.services";

// log in with id or password controller
export const loginController = catchAsync(async (req, res) => {
    const result = await logInService(req.body);
    sendResponse(res, {
        success: true,
        message: "Login successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});

// change password controller
export const changePasswordController = catchAsync(async (req, res) => {
    const userIdAndRole = req.decoded;
    const result = await changePasswordService(userIdAndRole, req.body);
    sendResponse(res, {
        success: true,
        message: "Login successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
