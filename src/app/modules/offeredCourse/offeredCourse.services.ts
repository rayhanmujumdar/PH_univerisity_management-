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
        section,
        faculty,
    } = payload;
    // academic department check into database
    const isAcademicDepartmentExist =
        await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "academicDepartment Not found",
        );
    }
    // academic faculty check into database
    const isAcademicFacultyExist =
        await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "academicFaculty Not found");
    }
    // academic semester registration check into database
    const isAcademicSemester =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "academicSemester Not found",
        );
    }
    // course check in database
    const isCourseExist = await Course.findById(course);
    if (!isCourseExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "course Not found");
    }
    // semester registration exist in database checking
    const isSemesterRegistrationExist =
        await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "semester registration Not found",
        );
    }
    // check this academic faculty are exist into academic department
    const isExistAcademicFacultyIntoAcademicDepartment =
        await AcademicDepartment.findOne({
            _id: academicDepartment,
            academicFacultyId: academicFaculty,
        });
    if (!isExistAcademicFacultyIntoAcademicDepartment) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `${isAcademicFacultyExist.name} is not exist into ${isAcademicDepartmentExist.name}`,
        );
    }
    // check offered course section is unique
    const checkOfferedCourseSectionWithCourseAndFaculty =
        await OfferCourse.findOne({
            section,
            course,
            faculty,
        });
    if (checkOfferedCourseSectionWithCourseAndFaculty) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `offered course section ${section} is not unique`,
        );
    }
    return OfferCourse.create(payload);
};
