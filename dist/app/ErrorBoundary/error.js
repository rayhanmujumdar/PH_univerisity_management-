"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// part - 1 (error handler)
const error = (statusCode = 500, message = "Internal Server error", stack = "") => {
    const err = new Error(message);
    err.statusCode = statusCode;
    if (stack) {
        err.stack = stack;
    }
    Error.captureStackTrace(err);
    return err;
};
// part - 2  (error handler)
class AppError extends Error {
    constructor(statusCode = 500, message = "Internal server error ", stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
exports.default = error;
