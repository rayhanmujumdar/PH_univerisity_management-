"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const error_1 = __importDefault(require("../../ErrorBoundary/error"));
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_constant_1.academicSemesterName,
        trim: true,
        max: [20, "name more then 20 characters"],
        required: [true, "name must be required"],
    },
    code: {
        type: String,
        enum: academicSemester_constant_1.academicSemesterCode,
        required: [true, "code must be required"],
    },
    year: {
        type: String,
        required: [true, "year must be required"],
    },
    startMonth: {
        type: String,
        enum: academicSemester_constant_1.months,
        required: [true, "startMonth must be required"],
    },
    endMonth: {
        type: String,
        enum: academicSemester_constant_1.months,
        required: [true, "endMonth must be required"],
    },
}, {
    timestamps: true,
});
// check same name or same year semester are already.
academicSemesterSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExist = yield AcademicSemester.findOne({
            year: this.year,
            name: this.name,
        });
        if (isSemesterExist) {
            throw error_1.default(500, "Semester is already exist");
        }
        next();
    });
});
const AcademicSemester = mongoose_1.model("AcademicSemester", academicSemesterSchema);
exports.default = AcademicSemester;
