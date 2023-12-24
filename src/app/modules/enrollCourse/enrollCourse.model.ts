import { Schema, model } from "mongoose";
import { grade } from "./enrollCourse.constant";
import { TCourseMarks, TEnrollCourse } from "./enrollCourse.interface";
const courseMarkSchema = new Schema<TCourseMarks>({
    classTest1: {
        type: Number,
        default: 0,
    },
    midTerm: {
        type: Number,
        default: 0,
    },
    classTest2: {
        type: Number,
        default: 0,
    },
    finalTerm: {
        type: Number,
        default: 0,
    },
});

const enrollCourseSchema = new Schema<TEnrollCourse>(
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
        offeredCourse: {
            type: Schema.Types.ObjectId,
            ref: "OfferedCourse",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: "Faculty",
            required: true,
        },
        courseMarks: courseMarkSchema,
        grade: {
            type: String,
            enum: grade,
            required: true,
            default: "NA",
        },
        gradePoints: {
            type: Number,
            min: 0,
            max: 4,
            default: 0,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        isEnrolled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const EnrollCourse = model<TEnrollCourse>("EnrollCourse", enrollCourseSchema);

export default EnrollCourse;
