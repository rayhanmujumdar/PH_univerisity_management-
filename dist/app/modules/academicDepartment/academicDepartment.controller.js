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
exports.updateAcademicDepartmentController = exports.getSingleAcademicDepartmentController = exports.getAllAcademicDepartmentController = exports.createAcademicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const error_1 = require("../../ErrorBoundary/error");
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const academicDepartment_services_1 = require("./academicDepartment.services");
// create new academic department controller
exports.createAcademicDepartmentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentData = req.body;
    const result = yield academicDepartment_services_1.createAcademicDepartmentService(departmentData);
    sendResponse_1.default(res, {
        success: true,
        message: "new academic department created successfully ",
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
// get all academic department controller
exports.getAllAcademicDepartmentController = catchAsync_1.default((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_services_1.getAllAcademicDepartmentService();
    sendResponse_1.default(res, {
        success: true,
        message: "fetch all academic department",
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
// get single academic department controller
exports.getSingleAcademicDepartmentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicDepartment_services_1.getSingleAcademicDepartmentService(id);
    if (!result)
        throw new error_1.AppError(http_status_1.default.NOT_FOUND, "academic department are not found");
    sendResponse_1.default(res, {
        success: true,
        message: "fetch a single academic department",
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
// update academic department controller
exports.updateAcademicDepartmentController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const departmentData = req.body;
    const result = yield academicDepartment_services_1.updateAcademicDepartmentService(id, departmentData);
    sendResponse_1.default(res, {
        success: true,
        message: "update academic department are successful",
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
