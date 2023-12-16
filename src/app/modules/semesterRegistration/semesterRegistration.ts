import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistration from "./semesterRegistration.model";

// create semester registration service
export const createSemesterRegistrationService = async (
    payload: TSemesterRegistration,
) => {
    const academicSemester = payload.academicSemester;
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.CONFLICT, "semester is already register");
    }
    const isAcademicSemesterExist =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "academic semester is not exist",
        );
    }
    return SemesterRegistration.create(payload);
};

// get all semester registration service
export const getAllSemesterRegistrationService = (
    query: Record<string, unknown>,
) => {
    const registrationSemester = new QueryBuilder(
        SemesterRegistration.find().populate("academicSemester"),
        query,
    )
        .sort()
        .limit()
        .skip()
        .fields();

    return registrationSemester.modelQuery;
};

// get a single registration semester service
export const getSingleSemesterRegistrationService = (id: string) => {
    return SemesterRegistration.findById(id).populate("academicSemester");
};
