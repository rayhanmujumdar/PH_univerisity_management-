import { z } from "zod";
export const createAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "name must be required" }),
    }),
});
export const updateAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "name must be required" }),
    }),
});
