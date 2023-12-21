import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import {
    changePasswordService,
    forgetPasswordService,
    logInService,
    refreshTokenService,
} from "./auth.services";

// log in with id or password controller
export const loginController = catchAsync(async (req, res) => {
    const { refreshToken, accessToken, needsPasswordChanged } =
        await logInService(req.body);

    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV === "production",
        httpOnly: true,
    });
    sendResponse(res, {
        success: true,
        message: "Login successfully",
        statusCode: httpStatus.OK,
        data: {
            accessToken,
            needsPasswordChanged,
        },
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

// refresh token controller
export const refreshTokenController = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await refreshTokenService(refreshToken);
    sendResponse(res, {
        success: true,
        message: "access token retrieved successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
// forget password controller
export const forgetPasswordController = catchAsync(async (req, res) => {
    const userId = req.body.id;
    const result = await forgetPasswordService(userId);
    sendResponse(res, {
        success: true,
        message: "forget password url retrieved successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
