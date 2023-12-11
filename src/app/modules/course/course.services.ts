import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchFields } from "./course.constant";
import { TCourse } from "./course.interface";
import Course from "./course.model";

// create a course
export const createCourseService = (payload: TCourse) => {
    return Course.create(payload);
};

// get all course
export const getAllCourseService = (query: Record<string, unknown>) => {
    const course = new QueryBuilder(
        Course.find().populate("preRequisiteCourse.course"),
        query,
    )
        .search(courseSearchFields)
        .limit()
        .skip()
        .sort()
        .fields();
    return course.modelQuery;
};

// get a single course
export const getASingleCourseService = (id: string) => {
    return Course.findById(id);
};

// delete course
export const deleteCourseService = (id: string) => {
    return Course.findByIdAndUpdate(id, { isDeleted: true });
};
