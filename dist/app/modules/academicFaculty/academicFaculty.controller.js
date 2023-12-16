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
exports.updateAcademicFacultyController = exports.getSingleAcademicFacultyController = exports.getAllAcademicFacultyController = exports.createAcademicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const academicFaculty_services_1 = require("./academicFaculty.services");
// create a new academic faculty
exports.createAcademicFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = req.body;
    const result = yield academicFaculty_services_1.createAcademicFacultyService(facultyData);
    sendResponse_1.default(res, {
        success: true,
        message: "Academic faculty created successfully",
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
// get a new academic faculty
exports.getAllAcademicFacultyController = catchAsync_1.default((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_services_1.getAllAcademicFacultyService();
    sendResponse_1.default(res, {
        success: true,
        message: "get all academic faculty successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// get a single academic faculty
exports.getSingleAcademicFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_services_1.getSingleAcademicFacultyService(id);
    sendResponse_1.default(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "get a single faculty successfully",
        data: result,
    });
}));
// update a single academic faculty
exports.updateAcademicFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const facultyData = req.body;
    const result = yield academicFaculty_services_1.updateSingleAcademicFacultyService(id, facultyData);
    sendResponse_1.default(res, {
        success: true,
        message: "update academic faculty successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
