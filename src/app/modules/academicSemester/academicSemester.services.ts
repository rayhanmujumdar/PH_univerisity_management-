import error from "../../lib/error";
import { semesterCodeAndNameMatchMapping } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

// create a new academic semester
export const createAcademicSemesterService = (
    semesterData: TAcademicSemester,
) => {
    if (
        semesterCodeAndNameMatchMapping[semesterData.name] !== semesterData.code
    ) {
        throw error(500, "invalid semester code");
    }
    return AcademicSemester.create(semesterData);
};

// get all academic semester service
export const getAllAcademicSemesterService = () => {
    return AcademicSemester.find({});
};
// get a single academic semester service
export const getSingleAcademicSemesterService = (id: string) => {
    return AcademicSemester.findById(id);
};

// update a single academic semester service
export const updateASingleAcademicSemesterService = (
    id: string,
    semesterData: Partial<TAcademicSemester>,
) => {
    if (
        semesterData.name &&
        semesterData.code &&
        semesterCodeAndNameMatchMapping[semesterData.name] !== semesterData.code
    ) {
        throw error(500, "invalid semester code");
    }
    return AcademicSemester.findByIdAndUpdate(id, semesterData);
};
