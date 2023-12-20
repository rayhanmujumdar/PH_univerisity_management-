import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { logInService } from "./auth.services";

export const loginController = catchAsync(async (req, res) => {
    const result = await logInService(req.body);
    sendResponse(res, {
        success: true,
        message: "Login successfully",
        statusCode: httpStatus.OK,
        data: result,
    });
});
