"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../lib/sendResponse"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const notFoundError = (_req, _res, next) => {
    const error = new Error("Response not found");
    error.statusCode = http_status_1.default.NOT_FOUND;
    next(error);
};
exports.notFoundError = notFoundError;
const errorHandler = (error, _req, res, _next) => {
    if (error && error.statusCode) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: error.message,
            statusCode: error.statusCode,
            data: error,
        });
    }
    return (0, sendResponse_1.default)(res, {
        success: false,
        message: "Internal server Error",
        statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
        data: error,
    });
};
exports.errorHandler = errorHandler;
