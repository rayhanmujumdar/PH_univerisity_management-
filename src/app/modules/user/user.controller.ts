import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../lib/catchAsync";
import sendResponse from "../../lib/sendResponse";
import { createStudentIntoDB } from "./user.services";

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
