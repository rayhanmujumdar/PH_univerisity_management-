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
exports.createFacultyController = exports.createStudentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const user_services_1 = require("./user.services");
exports.createStudentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const newStudentData = yield user_services_1.createStudentIntoDB(password, student);
    sendResponse_1.default(res, {
        success: true,
        message: "Student created successfully",
        statusCode: http_status_1.default.CREATED,
        data: newStudentData,
    });
}));
exports.createFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, faculty } = req.body;
    const newFacultyData = yield user_services_1.createFacultyIntoDB(password, faculty);
    sendResponse_1.default(res, {
        success: true,
        message: "Faculty created successfully",
        statusCode: http_status_1.default.CREATED,
        data: newFacultyData,
    });
}));
