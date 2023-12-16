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
const error_1 = __importDefault(require("../../ErrorBoundary/error"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name must be required"],
        unique: true,
    },
    academicFacultyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: [true, "academicFacultyId are required"],
    },
}, {
    timestamps: true,
});
// check academic department name before save
academicDepartmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExistName = yield AcademicDepartment.findOne({ name: this.name });
        if (isExistName) {
            next(error_1.default(500, "This department are already exist"));
        }
        next();
    });
});
// academic department exist in database checking
academicDepartmentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentExist = yield this.model.findById(query);
        if (!isDepartmentExist) {
            next(error_1.default(500, "Academic Department does not exist"));
        }
        next();
    });
});
const AcademicDepartment = mongoose_1.model("AcademicDepartment", academicDepartmentSchema);
exports.default = AcademicDepartment;
