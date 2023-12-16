import { z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";
// create semester registration zod validation schema
export const createSemesterRegistrationValidationSchema = z.object({
    academicSemester: z.string({
        required_error: "academicSemester id must be required",
        invalid_type_error: "academicSemester type must be a string",
    }),
    status: z.enum([...semesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number({
        required_error: "minCredit id must be required",
        invalid_type_error: "minCredit type must be a string",
    }),
    maxCredit: z.string({
        required_error: "maxCredit id must be required",
        invalid_type_error: "maxCredit type must be a string",
    }),
});

// update semester registration zod validation schema
export const updateSemesterRegistrationValidationSchema = z.object({
    academicSemester: z
        .string({
            required_error: "academicSemester id must be required",
            invalid_type_error: "academicSemester type must be a string",
        })
        .optional(),
    status: z
        .enum([...semesterRegistrationStatus] as [string, ...string[]])
        .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z
        .number({
            required_error: "minCredit id must be required",
            invalid_type_error: "minCredit type must be a string",
        })
        .optional(),
    maxCredit: z
        .string({
            required_error: "maxCredit id must be required",
            invalid_type_error: "maxCredit type must be a string",
        })
        .optional(),
});
