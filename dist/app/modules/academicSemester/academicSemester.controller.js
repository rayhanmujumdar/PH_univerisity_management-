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
exports.updateASingleAcademicSemesterController = exports.getASingleAcademicSemesterController = exports.getAllAcademicSemesterController = exports.createAcademicSemesterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const academicSemester_services_1 = require("./academicSemester.services");
const error_1 = __importDefault(require("../../ErrorBoundary/error"));
// create new academic semester
exports.createAcademicSemesterController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = req.body;
    const newAcademicSemesterData = yield academicSemester_services_1.createAcademicSemesterService(academicSemesterData);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "academic semester created successfully",
        data: newAcademicSemesterData,
    });
}));
// get all academic semester controller
exports.getAllAcademicSemesterController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_services_1.getAllAcademicSemesterService();
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "get all academic semester successfully",
        data: result,
    });
}));
// get a single academic semester controller
exports.getASingleAcademicSemesterController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicSemester_services_1.getSingleAcademicSemesterService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "get a single academic semester  successfully",
        data: result,
    });
}));
// update academic semester controller
exports.updateASingleAcademicSemesterController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const semesterData = req.body;
    const result = yield academicSemester_services_1.updateASingleAcademicSemesterService(id, semesterData);
    if (!result) {
        throw error_1.default(500, "semester update failed");
    }
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "update academic semester successfully",
        data: result,
    });
}));
