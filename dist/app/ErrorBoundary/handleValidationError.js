"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const message = "Validation error";
    const statusCode = 400;
    const errorSource = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    return {
        message,
        statusCode,
        errorSource,
    };
};
exports.default = handleValidationError;
