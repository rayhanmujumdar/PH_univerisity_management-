/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
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
            message: "Something went wrong",
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
    }
    // send error response to client
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource: errorSource,
        stack: config.NODE_ENV === "development" ? error?.stack : null,
    });
};
