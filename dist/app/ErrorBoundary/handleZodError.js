"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const message = "validation error";
    const statusCode = 400;
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        message,
        statusCode,
        errorSource,
    };
};
exports.default = handleZodError;
