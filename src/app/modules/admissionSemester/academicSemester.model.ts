import { model, Schema } from "mongoose";
import { TAdmissionSemester } from "./academicSemester.interface";
import {
    academicSemesterCode,
    academicSemesterName,
    months,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAdmissionSemester>(
    {
        name: {
            type: String,
            enum: academicSemesterName,
            trim: true,
            max: [20, "name more then 20 characters"],
            required: [true, "name must be required"],
        },
        code: {
            type: String,
            enum: academicSemesterCode,
            required: [true, "code must be required"],
        },
        year: {
            type: String,
            required: [true, "year must be required"],
        },
        startMonth: {
            type: String,
            enum: months,
            required: [true, "startMonth must be required"],
        },
        endMonth: {
            type: String,
            enum: months,
            required: [true, "endMonth must be required"],
        },
    },
    {
        timestamps: true,
    },
);

const AcademicSemester = model("AcademicSemester", academicSemesterSchema);

export default AcademicSemester;
