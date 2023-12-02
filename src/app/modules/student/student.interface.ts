import { Types } from "mongoose";
// gender type
export type TGender = "male" | "female" | "other";
// user name type
export type TUserName = {
    firstName: string;
    lastName: string;
};

// guardian type
export type TGuardian = {
    name: string;
    age: number;
    occupation: string;
    relation: "father" | "mother" | "brother" | "other";
    gender: TGender;
    contactNo: string;
};

// localGuardian
export type TLocalGuardian = {
    name: string;
    gender: TGender;
    occupation: string;
    contactNo: string;
};

// student type
export type TStudent = {
    id: string;
    userId: Types.ObjectId;
    name: TUserName;
    gender: TGender;
    age: number;
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg: string;
    department: string;
    academicSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
};
