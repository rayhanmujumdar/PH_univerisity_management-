import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { createStudentIntoDB } from "./user.services";
import { studentValidationSchema } from "../student/student.validation";
import sendResponse from "../../lib/sendResponse";

export const createStudentController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { password, student } = req.body;
        const studentDataValidation = studentValidationSchema.parse(student);
        const newStudentData = await createStudentIntoDB(
            password,
            studentDataValidation,
        );
        sendResponse(res, {
            success: true,
            message: "Student created successfully",
            statusCode: httpStatus.CREATED,
            data: newStudentData,
        });
    } catch (err) {
        next(err);
    }
};
