import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

export const createStudentIntoDB = async (
    password: string,
    studentData: Partial<TStudent>,
) => {
    // create a new user
    const userData: Partial<TUser> = {};
    userData.password = password
        ? password
        : (config.default_password as string);
    userData.role = "student";
    // set manually generated id
    userData.id = "2030100031";
    // create a user
    const newUser = await User.create(userData);
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.userId = newUser._id;
        const newStudent = await Student.create(studentData);
        return newStudent;
    }
};
