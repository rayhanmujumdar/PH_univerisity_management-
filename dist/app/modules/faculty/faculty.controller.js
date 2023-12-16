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
exports.deleteFacultyController = exports.updateFacultyController = exports.getSingleFacultyController = exports.getAllFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../lib/catchAsync"));
const sendResponse_1 = __importDefault(require("../../lib/sendResponse"));
const faculty_services_1 = require("./faculty.services");
// get all faculty controller
exports.getAllFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield faculty_services_1.getAllFacultyService(query);
    sendResponse_1.default(res, {
        success: true,
        message: "fetch faculty data successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// get single faculty controller
exports.getSingleFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_services_1.getSingleFacultyService(id);
    sendResponse_1.default(res, {
        success: true,
        message: "fetch a single faculty data successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// update single faculty controller
exports.updateFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const facultyData = req.body;
    const result = yield faculty_services_1.updateFacultyService(id, facultyData);
    sendResponse_1.default(res, {
        success: true,
        message: "update faculty data successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// delete single faculty controller
exports.deleteFacultyController = catchAsync_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield faculty_services_1.deleteFacultyService(id);
    sendResponse_1.default(res, {
        success: true,
        message: "delete faculty data successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
