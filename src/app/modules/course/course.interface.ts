import { Types } from "mongoose";
export type TPreRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
};

export type TCourse = {
    title: string;
    prefix: string;
    code: string;
    credits: number;
    isDeleted: boolean;
    preRequisiteCourse: TPreRequisiteCourse[];
};

export type TCourseFaculty = {
    course: Types.ObjectId;
    faculties: Types.ObjectId[];
};
