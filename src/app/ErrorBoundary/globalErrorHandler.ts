/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../lib/sendResponse";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const notFoundError = (
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const error: any = new Error("Response not found");
    error.statusCode = httpStatus.NOT_FOUND;
    next(error);
};

export const errorHandler = (
    error: any,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (error && error.statusCode) {
        return sendResponse(res, {
            success: false,
            message: error.message,
            statusCode: error.statusCode,
            data: error,
        });
    }
    return sendResponse(res, {
        success: false,
        message: "Internal server Error",
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        data: error,
    });
};
