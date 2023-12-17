import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import QueryBuilder from "../../builder/QueryBuilder";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { registrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistration from "./semesterRegistration.model";

// create semester registration service
export const createSemesterRegistrationService = async (
    payload: TSemesterRegistration,
) => {
    const academicSemester = payload.academicSemester;
    // check if there ay registered semester that is already UPCOMING or ONGOING
    const isThereUpcomingAndOngoingSemester =
        await SemesterRegistration.findOne({
            $or: [
                { status: registrationStatus.UPCOMING },
                { status: registrationStatus.UPCOMING },
            ],
        });
    if (isThereUpcomingAndOngoingSemester) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `There are already an ${isThereUpcomingAndOngoingSemester.status} semester registration`,
        );
    }
    // check if the semester is exist
    const isAcademicSemesterExist =
        await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "academic semester is not exist",
        );
    }
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.CONFLICT, "semester is already register");
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

// update semester registration service
export const updateSemesterRegistrationService = async (
    id: string,
    payload: Partial<TSemesterRegistration>,
) => {
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
    const requestedStatus = payload.status;
    // if the registration semester is not exist our database then throw an error
    if (!isSemesterRegistrationExist) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "semester Registration is not exist!",
        );
    }
    // if the registration semester is already ended. i will not update anything
    const currentRegistrationStatus = isSemesterRegistrationExist.status;
    if (currentRegistrationStatus === registrationStatus.ENDED) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Semester Registration is already ended!",
        );
    }
    // UPCOMING --> ONGOING --> ENDED
    if (
        currentRegistrationStatus === registrationStatus.UPCOMING &&
        requestedStatus === registrationStatus.ENDED
    ) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `cannot update directly from ${currentRegistrationStatus} to ${requestedStatus}`,
        );
    }
    if (
        currentRegistrationStatus === registrationStatus.ONGOING &&
        requestedStatus === registrationStatus.UPCOMING
    ) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `cannot update directly from ${currentRegistrationStatus} to ${requestedStatus}`,
        );
    }
    return SemesterRegistration.findByIdAndUpdate(
        id,
        {
            status: requestedStatus,
        },
        { new: true, runValidators: true },
    );
};
