/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { facultySearchableField } from "./faculty.constent";
import { TFaculty } from "./faculty.interface";
import Faculty from "./faculty.model";

// get all faculty
export const getAllFacultyService = async (query: Record<string, unknown>) => {
    const facultyData = new QueryBuilder(
        Faculty.find()
            .populate({
                path: "academicDepartment",
                populate: { path: "academicFaculty" },
            })
            .populate("academicFaculty"),
        query,
    )
        .search(facultySearchableField)
        .filter()
        .sort()
        .limit()
        .skip()
        .fields();
    const result = await facultyData.modelQuery;
    return result;
};

// get single faculty
export const getSingleFacultyService = (id: string) => {
    return Faculty.findOne({ id });
};

// update a single faculty
export const updateFacultyService = (
    id: string,
    updatedData: Partial<TFaculty>,
) => {
    const { name, ...remaining } = updatedData;
    const facultyUpdatedData: Record<string, unknown> = { ...remaining };
    if (name) {
        Object.entries(name).forEach(([key, val]) => {
            facultyUpdatedData[`name.${key}`] = val;
        });
    }
    return Faculty.findOneAndUpdate({ id }, facultyUpdatedData, { new: true });
};

// delete faculty
export const deleteFacultyService = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deleteFacultyUser = await User.updateOne(
            { id },
            { isDeleted: true },
        );
        if (
            !deleteFacultyUser.modifiedCount &&
            !deleteFacultyUser.matchedCount
        ) {
            throw new AppError(
                httpStatus.BAD_GATEWAY,
                "faculty user delete failed",
            );
        }
        const deletedFaculty = await Faculty.updateOne(
            { id },
            { isDeleted: true },
        );
        if (!deletedFaculty.modifiedCount && !deletedFaculty.matchedCount) {
            throw new AppError(
                httpStatus.BAD_GATEWAY,
                "faculty user delete failed",
            );
        }
        await session.commitTransaction();
        await session.endSession();
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, err.message);
    }
};
