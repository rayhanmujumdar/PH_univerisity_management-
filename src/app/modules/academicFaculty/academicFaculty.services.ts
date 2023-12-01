import { TAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

// create a new academic faculty
export const createAcademicFacultyService = (payload: TAcademicFaculty) => {
    return AcademicFaculty.create(payload);
};

// get all academic faculty
export const getAllAcademicFacultyService = () => {
    return AcademicFaculty.find();
};

// get single academic faculty
export const getSingleAcademicFacultyService = (facultyId: string) => {
    return AcademicFaculty.findById(facultyId);
};

// update Academic faculty
export const updateSingleAcademicFacultyService = (
    facultyId: string,
    payload: TAcademicFaculty,
) => {
    return AcademicFaculty.findByIdAndUpdate(facultyId, payload);
};
