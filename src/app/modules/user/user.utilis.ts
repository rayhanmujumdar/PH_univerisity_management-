import { Query } from "mongoose";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TRole } from "./user.interface";
import { User } from "./user.model";

export const duplicateEmailCheck = async <T>(
    email: string = "",
    model: Query<T[], T>,
) => {
    const existedEmail = await model
        .findOne({ email }, { email: 1, _id: 0 })
        .lean();
    return existedEmail ? true : false;
};

export const findLastUserId = async (userRole: TRole) => {
    const lastUser = await User.findOne({ role: userRole }, { _id: 0, id: 1 })
        .sort({ createdAt: -1 })
        .lean();
    return lastUser ? lastUser.id : null;
};

export const generateStudentId = async (semesterData: TAcademicSemester) => {
    // year + code + 4 digit number
    // 2030 - 01 - 0001
    const lastStudentId = await findLastUserId("student");
    const lastStudentYear = lastStudentId?.substring(0, 4);
    const lastStudentCode = lastStudentId?.substring(4, 6);
    const fourDigitNumber = lastStudentId?.substring(6);
    const currentStudentYear = semesterData.year;
    const currentStudentCode = semesterData.code;
    let currentFourDigitNumber = "0".padStart(4, "0");
    if (
        lastStudentId &&
        lastStudentYear === currentStudentYear &&
        lastStudentCode === currentStudentCode
    ) {
        currentFourDigitNumber = fourDigitNumber as string;
    }
    const increaseNumberVal = (Number(currentFourDigitNumber) + 1)
        .toString()
        .padStart(4, "0");
    return `${semesterData.year}${semesterData.code}${increaseNumberVal}`;
};

export const generateUserId = async (roleName: "faculty" | "admin") => {
    const lastUserId = await findLastUserId(roleName);
    const currentFourDigitNumber = "0".padStart(4, "0");
    // F-0001
    let lastUserNumber = lastUserId?.split("-")[1];
    if (lastUserId) {
        lastUserNumber = (Number(lastUserNumber) + 1)
            .toString()
            .padStart(4, "0");
    } else {
        lastUserNumber = (Number(currentFourDigitNumber) + 1)
            .toString()
            .padStart(4, "0");
    }
    const prefixRole = roleName === "faculty" ? "F" : "A";
    return `${prefixRole}-${lastUserNumber}`;
};
