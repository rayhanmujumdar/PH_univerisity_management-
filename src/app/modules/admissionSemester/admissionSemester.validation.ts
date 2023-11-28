import { z } from "zod";
import {
    academicSemesterCode,
    academicSemesterName,
    months,
} from "./academicSemester.constant";
export const createAdmissionSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemesterName] as [string, ...string[]], {
            required_error: "name must be required",
        }),
        year: z.string({ required_error: "year must be required" }),
        code: z.enum([...academicSemesterCode] as [string, ...string[]], {
            required_error: "code must be required",
        }),
        startMonth: z.enum([...months] as [string, ...string[]], {
            required_error: "startMonth must be required",
        }),
        endMonth: z.enum([...months] as [string, ...string[]], {
            required_error: "endMonth must be required",
        }),
    }),
});
