import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import error from "../../ErrorBoundary/error";
import {
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from "./student.interface";

export const userNameSchema = new Schema<TUserName>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

export const guardianSchema = new Schema<TGuardian>(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        relation: {
            type: String,
            enum: ["father", "mother", "brother", "other"],
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

export const localGuardianSchema = new Schema<TLocalGuardian>(
    {
        name: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
    },
    { _id: false },
);

const studentSchema = new Schema<TStudent>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "User",
        },
        name: userNameSchema,
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        emergencyContactNo: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        guardian: guardianSchema,
        localGuardian: localGuardianSchema,
        profileImg: String,
        department: {
            type: String,
            required: true,
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "AcademicSemester",
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "AcademicDepartment",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// check isStudent exist in database
studentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const isStudentExist = await this.model.findOne(query);
    if (!isStudentExist) {
        next(error(httpStatus.NOT_FOUND, "Student does not exist"));
    }
    next();
});

export const Student = model<TStudent>("Student", studentSchema);
