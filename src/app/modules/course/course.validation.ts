import { z } from "zod";

export const preRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
});

export const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "title must be required" }),
        prefix: z.string({ required_error: "prefix must be required" }),
        code: z.string({ required_error: "code must be required" }),
        credits: z.number({ required_error: "credits must be required" }),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z
            .array(preRequisiteCourseValidationSchema)
            .optional(),
    }),
});

export const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z
            .string({ required_error: "title must be required" })
            .optional(),
        prefix: z
            .string({ required_error: "prefix must be required" })
            .optional(),
        code: z.string({ required_error: "code must be required" }).optional(),
        credits: z
            .number({ required_error: "credits must be required" })
            .optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z
            .array(preRequisiteCourseValidationSchema)
            .optional(),
    }),
});

export const courseWithFacultyValidationSchema = z.object({
    body: z.object({
        course: z.string().optional(),
        faculties: z.array(z.string()).optional(),
    }),
});
