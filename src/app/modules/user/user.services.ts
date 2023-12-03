/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import error, { AppError } from "../../lib/error";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { duplicateEmailCheck, generateStudentId } from "./user.utilis";

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
        const isExistEmailIntoDB = await duplicateEmailCheck(studentData.email);
        if (isExistEmailIntoDB) {
            throw error(500, "Email already exist");
        }
        userData.role = "student";
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
