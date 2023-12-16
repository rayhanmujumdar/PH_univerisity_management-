"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultySchema = void 0;
const mongoose_1 = require("mongoose");
const student_model_1 = require("../student/student.model");
exports.facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "id must be required"],
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "userId must be required"],
    },
    name: student_model_1.userNameSchema,
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "academicDepartment must be required"],
        ref: "AcademicDepartment",
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// check deleted faculty
exports.facultySchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
const Faculty = mongoose_1.model("Faculty", exports.facultySchema);
exports.default = Faculty;
