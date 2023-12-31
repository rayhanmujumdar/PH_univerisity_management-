/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import error, { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";
import { studentSearchableField } from "./student.constant";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// get all student service
export const getAllStudentService = (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder<TStudent>(
        Student.find()
            .populate("userId")
            .populate("academicSemester")
            .populate({
                path: "academicDepartment",
                populate: { path: "academicFacultyId" },
            }),
        query,
    )
        .search(studentSearchableField)
        .filter()
        .sort()
        .skip()
        .limit()
        .fields();
    return studentQuery.modelQuery;
    // const queryObj = { ...query };
    // const studentSearchableField = [
    //     "email",
    //     "name.firstName",
    //     "presentAddress",
    // ];
    // let searchQuery = "";
    // if (query?.searchTerm && !query?.email) {
    //     searchQuery = query?.searchTerm as string;
    // }
    // /* mapping output is like is:
    //     {email: {regex: 'rayhan@gmail.com, options: 'i'}}
    //     {'name.firstName': {regex: 'rayhan', options: 'i'}}
    //     {presentAddress: {regex: 'dhaka', options: 'i'}}
    // */
    // const searchQueryStudent = Student.find({
    //     $or: studentSearchableField.map((field) => {
    //         return { [field]: { $regex: searchQuery, $options: "i" } };
    //     }),
    // });

    // // filter
    // const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
    // excludeField.forEach((el) => {
    //     delete queryObj[el];
    // });
    // const filteringWithEmail = searchQueryStudent
    //     .find(queryObj)
    //     .populate("academicSemester")
    //     .populate({
    //         path: "academicDepartment",
    //         populate: {
    //             path: "academicFacultyId",
    //         },
    //     });
    // // sorting
    // let sort = "-createdAt";
    // if (query?.sort) {
    //     sort = query.sort as string;
    // }
    // const sortedStudent = filteringWithEmail.sort(sort);
    // // limit or pagination
    // let limit = 0;
    // if (query?.limit) {
    //     limit = Number(query.limit);
    // }
    // let page = 1;
    // let skip = 0;
    // if (query?.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // const skipQuery = sortedStudent.skip(skip);
    // const limitQuery = skipQuery.limit(limit);
    // // fields filtering
    // let fields = "-__v";
    // if (query?.fields) {
    //     fields = (query?.fields as string).split(",").join(" ");
    // }
    // const fieldsQuery = limitQuery.select(fields);
    // return fieldsQuery;
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
    return Student.findByIdAndUpdate(id, modifyUpdatedData, {
        new: true,
        runValidators: true,
    });
};

export const deleteStudentService = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const userDeleted = await User.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );
        if (!userDeleted)
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "student was deleted failed",
            );
        const studentDeleted = await Student.findOneAndUpdate(
            { userId: id },
            { isDeleted: true },
            { new: true, session },
        );
        if (!studentDeleted)
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "student was deleted failed",
            );
        await session.commitTransaction();
        await session.endSession();
        return studentDeleted;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw error(httpStatus.BAD_REQUEST, err.message);
    }
};
