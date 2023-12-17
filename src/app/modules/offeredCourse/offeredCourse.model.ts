import { Schema, model } from "mongoose";
import { Days } from "./offeredCourse.constant";
import { TOfferedCorse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCorse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            ref: "SemesterRegistration",
            required: true,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: "AcademicDepartment",
            required: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: "AcademicFaculty",
            required: true,
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            ref: "AcademicSemester",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: "Faculty",
            required: true,
        },
        days: {
            type: String,
            enum: Days,
            required: true,
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        section: {
            type: Number,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const OfferCourse = model("OfferCourse", offeredCourseSchema);

export default OfferCourse;
