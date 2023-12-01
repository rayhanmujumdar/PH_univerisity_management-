import { z } from "zod";

export const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z
            .string({
                required_error: "name must be required",
                invalid_type_error: "name must be a string value",
            })
            .trim(),
        academicFacultyId: z.string({
            required_error: "academicFacultyId must be required",
            invalid_type_error: "academicFacultyId must be a string",
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
        academicFacultyId: z
            .string({
                required_error: "academicFacultyId must be required",
                invalid_type_error: "academicFacultyId must be a string",
            })
            .optional(),
    }),
});
