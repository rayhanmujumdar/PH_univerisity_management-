import httpStatus from "http-status";
import { AppError } from "../../lib/error";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// get all student service
export const getAllStudentService = () => {
    return Student.find();
};

// get single student service
export const getSingleStudentService = async (id: string) => {
    const student = await Student.findById(id)
        .populate("academicSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFacultyId",
            },
        });
    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, "Student does not exist");
    }
    return student;
};

// update student service
export const updateStudentService = (
    id: string,
    studentData: Partial<TStudent>,
) => {
    return Student.findByIdAndUpdate(id, studentData, { new: true });
};
