import httpStatus from "http-status";
import mongoose from "mongoose";
import { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import Course, { CourseFaculty } from "./course.model";

// create a course
export const createCourseService = (payload: TCourse) => {
    return Course.create(payload);
};

// get all course
export const getAllCourseService = async (query: Record<string, unknown>) => {
    const course = new QueryBuilder(
        Course.find().populate("preRequisiteCourse.course"),
        query,
    )
        .search(courseSearchFields)
        .limit()
        .skip()
        .sort()
        .fields();
    const result = await course.modelQuery;
    const meta = await course.countTotal();
    return {
        meta,
        result,
    };
};

// get a single course
export const getASingleCourseService = (id: string) => {
    return Course.findById(id);
};

// update a single course
export const updateCourseService = async (id: string, payload: TCourse) => {
    const { preRequisiteCourse, ...remainingFields } = payload;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            const deletedPreRequisite = preRequisiteCourse
                .filter((el) => {
                    return el.course && el.isDeleted;
                })
                .map((el) => el.course);
            await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourse: {
                            course: { $in: deletedPreRequisite },
                        },
                    },
                },
                {
                    session,
                    runValidators: true,
                },
            );
            const newPreRequisite = preRequisiteCourse.filter(
                (el) => el.course && !el.isDeleted,
            );
            await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourse: newPreRequisite,
                    },
                },
                { session, runValidators: true },
            );
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            remainingFields,
            { session, new: true, runValidators: true },
        ).populate("preRequisiteCourse.course");
        await session.commitTransaction();
        await session.endSession();
        return updatedCourse;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_GATEWAY, "Failed to update course");
    }
};

// assign course faculty
export const assignCourseWithFacultyService = (
    courseId: string,
    faculties: Partial<TCourseFaculty>,
) => {
    return CourseFaculty.findByIdAndUpdate(
        courseId,
        {
            course: courseId,
            $addToSet: { faculties: { $each: faculties } },
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
        },
    );
};
// assign course faculty
export const removeCourseWithFacultyService = (
    courseId: string,
    faculties: Partial<TCourseFaculty>,
) => {
    return CourseFaculty.findByIdAndUpdate(
        courseId,
        {
            $pull: { faculties: { $in: faculties } },
        },
        {
            new: true,
            runValidators: true,
            projection: "-__v -_id",
        },
    );
};

// delete course
export const deleteCourseService = (id: string) => {
    return Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
