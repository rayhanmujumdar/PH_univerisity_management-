import { Schema, model } from "mongoose";
import {
    TCourse,
    TCourseFaculty,
    TPreRequisiteCourse,
} from "./course.interface";

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);

const courseModelSchema = new Schema<TCourse>(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "title must be required"],
            unique: true,
        },
        prefix: {
            type: String,
            required: [true, "prefix must be required"],
            trim: true,
        },
        code: {
            type: String,
            required: [true, "code must be required "],
        },
        credits: {
            type: Number,
            required: [true, "code must be required "],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        preRequisiteCourse: [preRequisiteCourseSchema],
    },
    {
        timestamps: true,
    },
);

const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true,
    },
    faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
});

const Course = model<TCourse>("Course", courseModelSchema);

export const CourseFaculty = model<TCourseFaculty>(
    "CourseFaculty",
    courseFacultySchema,
);

export default Course;
