import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import AcademicSemester from "../academicSemester/academicSemester.model";
import Course from "../course/course.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCorse } from "./offeredCourse.interface";
import OfferCourse from "./offeredCourse.model";

export const createOfferedCourseService = async (payload: TOfferedCorse) => {
    const {
        academicDepartment,
        academicFaculty,
        academicSemester,
        course,
        semesterRegistration,
    } = payload;
    const isAcademicDepartmentExist =
        await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "academicDepartment Not found",
        );
    }
    const isAcademicFacultyExist =
        await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "academicFaculty Not found");
    }
    const isAcademicSemester =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "academicSemester Not found",
        );
    }
    const isCourseExist = await Course.findById(course);
    if (!isCourseExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "course Not found");
    }
    const isSemesterRegistrationExist =
        await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "semester registration Not found",
        );
    }
    return OfferCourse.create(payload);
};
