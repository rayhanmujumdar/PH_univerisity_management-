import { z } from "zod";
export const academicFacultyValidation = z.object({
    name: z.string({ required_error: "name must be required" }),
});
