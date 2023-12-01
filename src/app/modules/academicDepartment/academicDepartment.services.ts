import { TAcademicDepartment } from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";

// create a new academic department service
export const createAcademicDepartmentService = (
    payload: TAcademicDepartment,
) => {
    return AcademicDepartment.create(payload);
};

// get all academic department service
export const getAllAcademicDepartmentService = () => {
    return AcademicDepartment.find();
};

// get a single academic department service
export const getSingleAcademicDepartmentService = (departmentId: string) => {
    return AcademicDepartment.findById(departmentId);
};

// update a single academic department service
export const updateAcademicDepartmentService = (
    departmentId: string,
    payload: TAcademicDepartment,
) => {
    return AcademicDepartment.findByIdAndUpdate(departmentId, payload, {
        new: true,
    });
};
