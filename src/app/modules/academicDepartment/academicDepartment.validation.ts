import { z } from "zod";

export const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "name must be required",
                invalid_type_error: "name must be a string value",
            })
            .trim(),
        academicSemesterId: z.string({
            required_error: "academicSemesterId must be required",
            invalid_type_error: "academicSemester must be a string",
        }),
    }),
});

export const updateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "name must be required",
                invalid_type_error: "name must be a string value",
            })
            .trim()
            .optional(),
        academicSemesterId: z
            .string({
                required_error: "academicSemesterId must be required",
                invalid_type_error: "academicSemester must be a string",
            })
            .optional(),
    }),
});
