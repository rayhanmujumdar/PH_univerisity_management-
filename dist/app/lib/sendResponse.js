"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, responseData) => {
    if (!responseData.success) {
        res.status(responseData.statusCode).json({
            success: responseData.success,
            message: responseData.message,
            error: responseData.data,
        });
    }
    res.status(responseData.statusCode).json({
        success: responseData.success,
        message: responseData.message,
        data: responseData.data,
    });
};
exports.default = sendResponse;
