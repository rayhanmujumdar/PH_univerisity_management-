import { z } from "zod";

export const courseMarksValidationSchema = z.object({
    classTest1: z.number().min(0).optional(),
    midTerm: z.number().min(0).optional(),
    classTest2: z.number().min(0).optional(),
    finalTerm: z.number().min(0).optional(),
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
        semesterRegistration: z
            .string({
                required_error: "semesterRegistration must be required",
            })
            .optional(),

        offeredCourse: z
            .string({
                required_error: "semesterRegistration must be required",
            })
            .optional(),

        student: z
            .string({
                required_error: "semesterRegistration must be required",
            })
            .optional(),

        courseMarks: courseMarksValidationSchema.optional(),
    }),
});
