"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicFacultySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name must be required"],
    },
}, {
    timestamps: true,
});
const AcademicFaculty = mongoose_1.model("AcademicFaculty", academicFacultySchema);
exports.default = AcademicFaculty;
