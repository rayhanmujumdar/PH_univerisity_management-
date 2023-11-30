import config from "../../config";
import error from "../../lib/error";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { duplicateEmailCheck, generateStudentId } from "./user.utilis";

export const createStudentIntoDB = async (
    password: string,
    studentData: Partial<TStudent>,
) => {
    // create a new user
    const userData: Partial<TUser> = {};
    const semesterData = await AcademicSemester.findById(
        studentData.admissionSemester,
    );
    if (!semesterData) {
        throw error(500, "semester not found");
    }
    userData.password = password
        ? password
        : (config.default_password as string);
    const isExistEmailIntoDB = await duplicateEmailCheck(studentData.email);
    if (isExistEmailIntoDB) {
        throw error(500, "Email already exist");
    }
    userData.role = "student";
    // set manually generated id
    userData.id = await generateStudentId(semesterData);
    // create a user
    const newUser = await User.create(userData);
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.userId = newUser._id;
        const newStudent = await Student.create(studentData);
        return newStudent;
    }
};
