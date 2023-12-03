/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import error, { AppError } from "../../lib/error";
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
    const student = await Student.findById(id)
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
    studentData: Partial<TStudent>,
) => {
    return Student.findByIdAndUpdate(id, studentData, { new: true });
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
