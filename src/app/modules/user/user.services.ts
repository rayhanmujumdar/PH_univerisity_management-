/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import error, { AppError } from "../../ErrorBoundary/error";
import config from "../../config";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
    duplicateEmailCheck,
    generateStudentId,
    generateUserId,
} from "./user.utilis";

export const createStudentIntoDB = async (
    password: string,
    studentData: Partial<TStudent>,
) => {
    // create a transaction session
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // create a new user
        const userData: Partial<TUser> = {};
        const semesterData = await AcademicSemester.findById(
            studentData.academicSemester,
        );
        if (!semesterData) {
            throw error(500, "semester not found");
        }
        userData.password = password
            ? password
            : (config.default_password as string);
        const isExistEmailIntoDB = await duplicateEmailCheck<TStudent>(
            studentData.email,
            Student.find(),
        );
        if (isExistEmailIntoDB) {
            throw error(500, "Email already exist");
        }
        userData.role = "student";
        userData.email = studentData.email;
        // set manually generated id
        userData.id = await generateStudentId(semesterData);
        // create a user (transaction - 1)
        const newUser = await User.create([userData], { session });
        // const newUser = await User.create(userData);
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to create user");
        }
        studentData.id = newUser[0].id;
        studentData.userId = newUser[0]._id;
        // create a student (transaction - 2)
        const [newStudent] = await Student.create([studentData], { session });
        await session.commitTransaction();
        await session.endSession();
        return newStudent;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw error(httpStatus.BAD_REQUEST, err.message);
    }
};

export const createFacultyIntoDB = async (
    password: string,
    faculty: Partial<TFaculty>,
) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const userData: Partial<TUser> = {};
        userData.role = "faculty";
        userData.email = faculty.email;
        userData.password = password ? password : config.default_password;
        userData.id = await generateUserId("faculty");
        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "faculty created failed",
            );
        }
        faculty.id = newUser[0].id;
        faculty.userId = newUser[0]._id;
        const isExistEmailIntoDB = await duplicateEmailCheck<TStudent>(
            faculty?.email,
            Faculty.find(),
        );
        if (isExistEmailIntoDB) {
            throw error(500, "Email already exist");
        }
        const [newFaculty] = await Faculty.create([faculty], { session });
        await session.commitTransaction();
        await session.endSession();
        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    }
};
