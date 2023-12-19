import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import AcademicSemester from "../academicSemester/academicSemester.model";
import Course from "../course/course.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCorse, TUpdateOfferedCourse } from "./offeredCourse.interface";
import OfferCourse from "./offeredCourse.model";
import { hasScheduleTimeConflict } from "./offeredCourse.utils";

// create offered course service
export const createOfferedCourseService = async (payload: TOfferedCorse) => {
    const {
        academicDepartment,
        academicFaculty,
        academicSemester,
        course,
        semesterRegistration,
        section,
        faculty,
        days,
        startTime,
        endTime,
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
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    const assignedSchedule = await OfferCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    });
    if (hasScheduleTimeConflict(assignedSchedule, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available this time. please choose another time and days`,
        );
    }
    return OfferCourse.create({ ...payload, academicSemester });
};

// get all offered course service
export const getAllOfferedCourseService = (query: Record<string, unknown>) => {
    const offeredCourse = new QueryBuilder(
        OfferCourse.find()
            .populate("semesterRegistration")
            .populate("academicDepartment")
            .populate("academicFaculty")
            .populate("academicSemester")
            .populate("course")
            .populate("faculty"),
        query,
    )
        .search(["days", "startTime", "endTime"])
        .sort()
        .skip()
        .limit()
        .fields();
    return offeredCourse.modelQuery.select("-__v -createdAt -updatedAt");
};

// update offered course service
export const updateOfferedCourseService = async (
    id: string,
    payload: TUpdateOfferedCourse,
) => {
    // 1: check offered course is exist in db
    // 2: check semester registration status is UPCOMING
    // 3: check offered course schedule is valid
    const { faculty, days, startTime, endTime } = payload;
    const isOfferedCourseExist = await OfferCourse.findById(id);
    if (!isOfferedCourseExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "This Offered course is not exist",
        );
    }
    const semesterRegistration = await SemesterRegistration.findById(
        isOfferedCourseExist.semesterRegistration,
    );
    if (semesterRegistration?.status !== "UPCOMING") {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `could not update offered course because semester registration status is ${semesterRegistration?.status}`,
        );
    }
    const newSchedule = {
        days,
        startTime,
        endTime,
    };
    const assignedSchedule = await OfferCourse.find({
        semesterRegistration: semesterRegistration?._id,
        faculty,
        days: { $in: days },
    });
    if (hasScheduleTimeConflict(assignedSchedule, newSchedule)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available this time. please choose another time and days`,
        );
    }
    return OfferCourse.findByIdAndUpdate(id, payload, { new: true });
};
