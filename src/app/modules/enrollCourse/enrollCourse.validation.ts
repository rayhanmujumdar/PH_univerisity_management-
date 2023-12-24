import { z } from "zod";
import { grade } from "./enrollCourse.constant";

export const courseMarksValidationSchema = z.object({
    classTest1: z.number().default(0).optional(),
    midTerm: z.number().default(0).optional(),
    classTest2: z.number().default(0).optional(),
    finalTerm: z.number().default(0).optional(),
});

export const createEnrollCourseValidationSchema = z.object({
    body: z.object({
        offeredCourse: z.string({
            required_error: "semesterRegistration must be required",
        }),
    }),
});

export const updateEnrollCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string({
            required_error: "semesterRegistration must be required",
        }),
        academicSemester: z.string({
            required_error: "semesterRegistration must be required",
        }),
        academicDepartment: z.string({
            required_error: "semesterRegistration must be required",
        }),
        offeredCourse: z.string({
            required_error: "semesterRegistration must be required",
        }),
        academicFaculty: z.string({
            required_error: "semesterRegistration must be required",
        }),
        faculty: z.string({
            required_error: "semesterRegistration must be required",
        }),
        course: z.string({
            required_error: "semesterRegistration must be required",
        }),
        student: z.string({
            required_error: "semesterRegistration must be required",
        }),
        isEnrolled: z
            .boolean({ required_error: "isEnrolled must be boolean" })
            .optional(),
        courseMarks: courseMarksValidationSchema.optional(),
        grade: z
            .enum([...(grade as [string, ...string[]])])
            .default("NA")
            .optional(),
        gradePoints: z.number().min(0).max(4).default(0).optional(),
        isCompleted: z.boolean().default(false).optional(),
    }),
});
