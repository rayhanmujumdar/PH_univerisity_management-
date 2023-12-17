import { Types } from "mongoose";

export type TDays = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export type TOfferedCorse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    faculty: Types.ObjectId;
    course: Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: TDays;
    startTime: string;
    endTime: string;
};
