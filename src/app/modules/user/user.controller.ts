import httpStatus from "http-status";
import { Request, Response } from "express";
import { createStudentIntoDB } from "./user.services";
import sendResponse from "../../lib/sendResponse";
import catchAsync from "../../lib/catchAsync";

export const createStudentController = catchAsync(
    async (req: Request, res: Response) => {
        const { password, student } = req.body;
        const newStudentData = await createStudentIntoDB(password, student);
        sendResponse(res, {
            success: true,
            message: "Student created successfully",
            statusCode: httpStatus.CREATED,
            data: newStudentData,
        });
    },
);
