"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student =
    exports.localGuardianSchema =
    exports.guardianSchema =
    exports.userNameSchema =
        void 0;
const mongoose_1 = require("mongoose");
exports.userNameSchema = new mongoose_1.Schema(
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
exports.guardianSchema = new mongoose_1.Schema(
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
exports.localGuardianSchema = new mongoose_1.Schema(
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
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
    name: exports.userNameSchema,
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
    email: {
        type: String,
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
    guardian: exports.guardianSchema,
    localGuardian: exports.localGuardianSchema,
    profileImg: String,
    department: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
