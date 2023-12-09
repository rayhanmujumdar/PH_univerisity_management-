import { Schema, model } from "mongoose";
import { userNameSchema } from "../student/student.model";
import { TFaculty } from "./faculty.interface";

export const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, "id must be required"],
        },
        userId: {
            type: String,
            required: [true, "userId must be required"],
        },
        name: userNameSchema,
        age: {
            type: Number,
            required: [true, "age must be required"],
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: [true, "gender must be required"],
        },
        email: {
            type: String,
            required: [true, "email must be required"],
        },
        contactNo: {
            type: String,
            required: [true, "contactNo must be required"],
        },
        dateOfBirth: {
            type: String,
            required: [true, "dateOfBirth must be required"],
        },
        department: {
            type: String,
            required: [true, "department must be required"],
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: [true, "academicDepartment must be required"],
            ref: "AcademicDepartment",
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: [true, "academicFaculty must be required"],
            ref: "AcademicFaculty",
        },
        presentAddress: {
            type: String,
            required: [true, "presentAddress must be required"],
        },
        permanentAddress: {
            type: String,
            required: [true, "permanentAddress must be required"],
        },
        profileImg: String,
        emergencyContactNo: {
            type: String,
            required: [true, "emergencyContactNo must be required"],
        },
        designation: {
            type: String,
            required: [true, "designation must be required"],
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

const Faculty = model("Faculty", facultySchema);

export default Faculty;
