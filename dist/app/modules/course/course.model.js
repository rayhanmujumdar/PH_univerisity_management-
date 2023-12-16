"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCourseSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
const courseModelSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const courseFacultySchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        unique: true,
    },
    faculties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Faculty" }],
});
const Course = mongoose_1.model("Course", courseModelSchema);
exports.CourseFaculty = mongoose_1.model("CourseFaculty", courseFacultySchema);
exports.default = Course;
