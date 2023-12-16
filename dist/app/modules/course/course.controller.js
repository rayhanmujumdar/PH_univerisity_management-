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
exports.deleteCourseController = exports.removeCourseWithFacultyController = exports.assignCourseWithFacultyController = exports.updateCourseController = exports.getSingleCourseController = exports.getAllCourseController = exports.createCourseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const course_services_1 = require("./course.services");
exports.createCourseController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield course_services_1.createCourseService(data);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Course create successfully",
        data: result,
    });
}));
exports.getAllCourseController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield course_services_1.getAllCourseService(query);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "fetch all courses successfully",
        data: result,
    });
}));
exports.getSingleCourseController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield course_services_1.getASingleCourseService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "fetch a single successfully",
        data: result,
    });
}));
exports.updateCourseController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const courseData = req.body;
    const result = yield course_services_1.updateCourseService(id, courseData);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "fetch a single successfully",
        data: result,
    });
}));
// assign new course faculty
exports.assignCourseWithFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_services_1.assignCourseWithFacultyService(courseId, faculties);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "faculties updated successfully",
        data: result,
    });
}));
// remove course faculty into course
exports.removeCourseWithFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_services_1.removeCourseWithFacultyService(courseId, faculties);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "faculties updated successfully",
        data: result,
    });
}));
exports.deleteCourseController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield course_services_1.deleteCourseService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "delete course successfully",
        data: result,
    });
}));
