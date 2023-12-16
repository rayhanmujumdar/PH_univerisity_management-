"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const message = "Invalid ID";
    const statusCode = 400;
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message,
        errorSource,
    };
};
exports.default = handleCastError;
