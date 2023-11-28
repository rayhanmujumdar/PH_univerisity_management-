import { TAdmissionSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createAcademicSemesterService = async (
    semesterData: TAdmissionSemester,
) => {
    const result = await AcademicSemester.create(semesterData);
    return result;
};
