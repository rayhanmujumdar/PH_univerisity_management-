/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import { AppError } from "./error";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import handleValidationError from "./handleValidationError";
import handleZodError from "./handleZodError";

/* eslint-disable @typescript-eslint/no-explicit-any */
// response error handler
export const notFoundError = (
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const error: any = new Error("Response not found");
    error.statusCode = httpStatus.NOT_FOUND;
    next(error);
};

// global error handler
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    let message = error.message;
    let statusCode = error.statusCode || 500;
    let errorSource: TErrorSource[] = [
        {
            path: "",
            message: error.message,
        },
    ];
    // check zod error instance
    if (error instanceof ZodError) {
        const zodError = handleZodError(error);
        message = zodError.message;
        statusCode = zodError.statusCode;
        errorSource = zodError.errorSource;
    }
    if (error.name === "ValidationError") {
        const mongooseValidationError = handleValidationError(error);
        message = mongooseValidationError.message;
        statusCode = mongooseValidationError.statusCode;
        errorSource = mongooseValidationError.errorSource;
    } else if (error.name === "CastError") {
        const castError = handleCastError(error);
        message = castError.message;
        statusCode = castError.statusCode;
        errorSource = castError.errorSource;
    } else if (error.code === 11000) {
        const duplicateError = handleDuplicateError(error);
        message = duplicateError.message;
        statusCode = duplicateError.statusCode;
        errorSource = duplicateError.errorSource;
    } else if (error instanceof AppError) {
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
        stack: config.NODE_ENV === "development" ? error?.stack : null,
    });
};
