"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const error_1 = require("./error");
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const handleZodError_1 = __importDefault(require("./handleZodError"));
/* eslint-disable @typescript-eslint/no-explicit-any */
// response error handler
const notFoundError = (_req, _res, next) => {
    const error = new Error("Response not found");
    error.statusCode = http_status_1.default.NOT_FOUND;
    next(error);
};
exports.notFoundError = notFoundError;
// global error handler
const errorHandler = (error, _req, res, _next) => {
    let message = error.message;
    let statusCode = error.statusCode || 500;
    let errorSource = [
        {
            path: "",
            message: error.message,
        },
    ];
    // check zod error instance
    if (error instanceof zod_1.ZodError) {
        const zodError = handleZodError_1.default(error);
        message = zodError.message;
        statusCode = zodError.statusCode;
        errorSource = zodError.errorSource;
    }
    if (error.name === "ValidationError") {
        const mongooseValidationError = handleValidationError_1.default(error);
        message = mongooseValidationError.message;
        statusCode = mongooseValidationError.statusCode;
        errorSource = mongooseValidationError.errorSource;
    }
    else if (error.name === "CastError") {
        const castError = handleCastError_1.default(error);
        message = castError.message;
        statusCode = castError.statusCode;
        errorSource = castError.errorSource;
    }
    else if (error.code === 11000) {
        const duplicateError = handleDuplicateError_1.default(error);
        message = duplicateError.message;
        statusCode = duplicateError.statusCode;
        errorSource = duplicateError.errorSource;
    }
    else if (error instanceof error_1.AppError) {
        message = error.message;
        statusCode = error.statusCode;
        errorSource = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    // send error response to client
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config_1.default.NODE_ENV === "development" ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.errorHandler = errorHandler;
