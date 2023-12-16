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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserId = exports.generateStudentId = exports.findLastUserId = exports.duplicateEmailCheck = void 0;
const user_model_1 = require("./user.model");
const duplicateEmailCheck = (email = "", model) => __awaiter(void 0, void 0, void 0, function* () {
    const existedEmail = yield model
        .findOne({ email }, { email: 1, _id: 0 })
        .lean();
    return existedEmail ? true : false;
});
exports.duplicateEmailCheck = duplicateEmailCheck;
const findLastUserId = (userRole) => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({ role: userRole }, { _id: 0, id: 1 })
        .sort({ createdAt: -1 })
        .lean();
    return lastUser ? lastUser.id : null;
});
exports.findLastUserId = findLastUserId;
const generateStudentId = (semesterData) => __awaiter(void 0, void 0, void 0, function* () {
    // year + code + 4 digit number
    // 2030 - 01 - 0001
    const lastStudentId = yield exports.findLastUserId("student");
    const lastStudentYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const lastStudentCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const fourDigitNumber = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(6);
    const currentStudentYear = semesterData.year;
    const currentStudentCode = semesterData.code;
    let currentFourDigitNumber = "0".padStart(4, "0");
    if (lastStudentId &&
        lastStudentYear === currentStudentYear &&
        lastStudentCode === currentStudentCode) {
        currentFourDigitNumber = fourDigitNumber;
    }
    const increaseNumberVal = (Number(currentFourDigitNumber) + 1)
        .toString()
        .padStart(4, "0");
    return `${semesterData.year}${semesterData.code}${increaseNumberVal}`;
});
exports.generateStudentId = generateStudentId;
const generateUserId = (roleName) => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyId = yield exports.findLastUserId(roleName);
    const currentFourDigitNumber = "0".padStart(4, "0");
    // F-0001
    let lastFacultyNumber = lastFacultyId === null || lastFacultyId === void 0 ? void 0 : lastFacultyId.split("-")[1];
    if (lastFacultyId) {
        lastFacultyNumber = (Number(lastFacultyNumber) + 1)
            .toString()
            .padStart(4, "0");
    }
    else {
        lastFacultyNumber = (Number(currentFourDigitNumber) + 1)
            .toString()
            .padStart(4, "0");
    }
    const prefixRole = roleName === "faculty" ? "F" : "A";
    return `${prefixRole}-${lastFacultyNumber}`;
});
exports.generateUserId = generateUserId;
