import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../ErrorBoundary/error";
import Course from "../course/course.model";
import Faculty from "../faculty/faculty.model";
import OfferCourse from "../offeredCourse/offeredCourse.model";
import SemesterRegistration from "../semesterRegistration/semesterRegistration.model";
import { Student } from "../student/student.model";
import { TCourseMarks, TEnrollCourse } from "./enrollCourse.interface";
import EnrollCourse from "./enrollCourse.model";
import { calculateGrade } from "./enrollCourse.utils";

// create a new enroll course service
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
    const student = await Student.findOne({ id: userId }, { _id: 1 });
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
    const enrollCoursesTotalCredit = await EnrollCourse.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExist.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "enrollCourses",
            },
        },
        {
            $unwind: "$enrollCourses",
        },
        {
            $group: {
                _id: null,
                totalCourseCredit: { $sum: "$enrollCourses.credits" },
            },
        },
        {
            $project: {
                _id: 0,
                totalCourseCredit: 1,
            },
        },
    ]);
    // total credit + new enroll course credit > semesterRegistration credits = throw an error
    const totalCredit =
        enrollCoursesTotalCredit.length > 0
            ? enrollCoursesTotalCredit[0].totalCourseCredit
            : 0;
    const course = await Course.findById(isOfferedCourseExist.course, {
        credits: 1,
    });

    const semesterMaxCredit = await SemesterRegistration.findById(
        isOfferedCourseExist.semesterRegistration,
        { maxCredit: 1 },
    );
    if (!course || !semesterMaxCredit) {
        throw new AppError(httpStatus.NOT_FOUND, "credits not found");
    }
    if (totalCredit + course?.credits > semesterMaxCredit?.maxCredit) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You have exceeds maximum number of credits, you can not enrolled, please upgrade your credit point",
        );
    }
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await EnrollCourse.create(
            [
                {
                    semesterRegistration:
                        isOfferedCourseExist.semesterRegistration,
                    academicSemester: isOfferedCourseExist.academicSemester,
                    academicDepartment: isOfferedCourseExist.academicDepartment,
                    offeredCourse: payload.offeredCourse,
                    academicFaculty: isOfferedCourseExist.academicFaculty,
                    faculty: isOfferedCourseExist.faculty,
                    course: isOfferedCourseExist.course,
                    student: student._id,
                    isEnrolled: true,
                },
            ],
            { session },
        );
        if (!result.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Student course enrolled failed",
            );
        }
        const maxCapacity = isOfferedCourseExist.maxCapacity;
        await OfferCourse.updateOne(
            { _id: payload.offeredCourse },
            { maxCapacity: maxCapacity - 1 },
            { session },
        );
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
    }
};

// update enroll course service
export const updateEnrollCourseService = async (
    facultyId: string,
    payload: Partial<TEnrollCourse>,
) => {
    const { offeredCourse, student, semesterRegistration, courseMarks } =
        payload;
    const isOfferedCourseExist = await OfferCourse.findById(offeredCourse);
    if (!isOfferedCourseExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "OfferedCourse does not exist",
        );
    }
    const isStudentExist = await Student.findById(student);
    if (!isStudentExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "isStudentExist does not exist",
        );
    }
    const isSemesterRegistrationExist =
        await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Semester Registration not found",
        );
    }

    const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });
    if (!faculty) {
        throw new AppError(httpStatus.NOT_FOUND, "faculty not found");
    }
    // is this faculty are exist into enroll course check
    const isEnrollCourseBelongToFaculty = await EnrollCourse.findOne({
        offeredCourse,
        student,
        semesterRegistration,
        faculty: faculty._id,
    });
    if (!isEnrollCourseBelongToFaculty) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
    }

    const modifyMarks: Record<string, unknown> = { ...courseMarks };
    if (modifyMarks && Object.keys(modifyMarks).length) {
        for (const [key, value] of Object.entries(modifyMarks)) {
            modifyMarks[`courseMarks.${key}`] = value;
        }
    }
    if (courseMarks?.finalTerm) {
        // const { classTest1, classTest2, midTerm, finalTerm } =
        const updateCourseMarks: Record<string, number> = {
            ...isEnrollCourseBelongToFaculty.toObject().courseMarks,
        };
        if (Object.keys(courseMarks).length) {
            for (const [key, value] of Object.entries(courseMarks)) {
                updateCourseMarks[key] = updateCourseMarks[key] + value;
            }
        }

        const { classTest1, midTerm, classTest2, finalTerm } =
            updateCourseMarks as TCourseMarks;
        const totalMarks = Math.ceil(
            classTest1 * 0.1 +
                midTerm * 0.3 +
                classTest2 * 0.1 +
                finalTerm * 0.5,
        );
        console.log(totalMarks);
        const gradeResult = calculateGrade(totalMarks);
        modifyMarks.grade = gradeResult.grade;
        modifyMarks.gradePoints = gradeResult.gradePoints;
    }
    const result = await EnrollCourse.findByIdAndUpdate(
        isEnrollCourseBelongToFaculty._id,
        modifyMarks,
        { new: true, runValidators: true },
    );
    return result;
};
