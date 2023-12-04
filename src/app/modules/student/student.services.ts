/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import error, { AppError } from "../../ErrorBoundary/error";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// get all student service
export const getAllStudentService = () => {
    return Student.find()
        .populate("academicSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFacultyId",
            },
        });
};

// get single student service
export const getSingleStudentService = async (id: string) => {
    const student = await Student.findOne({ id })
        .populate("academicSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFacultyId",
            },
        });
    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, "Student does not exist");
    }
    return student;
};

// update student service
export const updateStudentService = (
    id: string,
    payload: Partial<TStudent>,
) => {
    const { name, guardian, localGuardian, ...remainingPayload } = payload;
    const modifyUpdatedData: Record<string, unknown> = { ...remainingPayload };
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifyUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifyUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifyUpdatedData[`localGuardian.${key}`] = value;
        }
    }
    return Student.findOneAndUpdate({ id }, modifyUpdatedData, {
        new: true,
        runValidators: true,
    });
};

export const deleteStudentService = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const isUserDeleted = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );
        if (!isUserDeleted)
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "student was deleted failed",
            );
        const isStudentDeleted = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },
        );
        if (!isStudentDeleted)
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "student was deleted failed",
            );
        await session.commitTransaction();
        await session.endSession();
        return isStudentDeleted;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw error(httpStatus.BAD_REQUEST, err.message);
    }
};
