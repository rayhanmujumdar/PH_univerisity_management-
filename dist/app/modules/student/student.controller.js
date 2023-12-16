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
exports.deleteStudentController = exports.updateStudentController = exports.getSingleStudentController = exports.getAllStudentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const student_services_1 = require("./student.services");
// get all student controller
exports.getAllStudentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_services_1.getAllStudentService(req.query);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All student fetch successfully",
        data: result,
    });
}));
// get single student controller
exports.getSingleStudentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_services_1.getSingleStudentService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "student fetch successfully",
        data: result,
    });
}));
// update a single student controller
exports.updateStudentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const studentData = req.body;
    const result = yield student_services_1.updateStudentService(id, studentData);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Student updated successfully",
        data: result,
    });
}));
// delete student controller
exports.deleteStudentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_services_1.deleteStudentService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "student deleted successfully ",
        data: result,
    });
}));
