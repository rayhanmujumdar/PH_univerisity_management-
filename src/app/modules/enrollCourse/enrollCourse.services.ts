import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import OfferCourse from "../offeredCourse/offeredCourse.model";
import { Student } from "../student/student.model";
import { TEnrollCourse } from "./enrollCourse.interface";
import EnrollCourse from "./enrollCourse.model";

export const createEnrollCourseService = async (
    userId: string,
    payload: TEnrollCourse,
) => {
    const { offeredCourse } = payload;
    const isOfferedCourseExist = await OfferCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "OfferedCourse does not exist",
        );
    }
    if (isOfferedCourseExist.maxCapacity <= 0) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Maximum capacity is already full",
        );
    }
    const student = await Student.findOne({ id: userId }).select("_id");
    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    }
    const isStudentAlreadyEnrolled = await EnrollCourse.findOne({
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        offeredCourse: isOfferedCourseExist._id,
        student: student._id,
    });
    if (isStudentAlreadyEnrolled) {
        throw new AppError(
            httpStatus.CONFLICT,
            "Student already enrolled this course",
        );
    }
    return true;
};
