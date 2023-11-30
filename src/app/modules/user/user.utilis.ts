import { TAcademicSemester } from "../admissionSemester/academicSemester.interface";
import { User } from "./user.model";

export const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        { role: "student" },
        { _id: 0, id: 1 },
    )
        .sort({ createdAt: -1 })
        .lean();
    return lastStudent?.id ? lastStudent.id.substring(6) : null;
};

export const generateStudentId = async (semesterData: TAcademicSemester) => {
    // year + code + 4 digit number
    const lastStudentFourDigitNumber = await findLastStudentId();
    const initialValue = lastStudentFourDigitNumber || "0".padStart(4, "0");
    const increaseNumberVal = (Number(initialValue) + 1)
        .toString()
        .padStart(4, "0");
    return `${semesterData.year}${semesterData.code}${increaseNumberVal}`;
};
