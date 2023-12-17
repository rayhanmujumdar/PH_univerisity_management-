import { z } from "zod";
import { Days } from "./offeredCourse.constant";

export const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string({
            required_error: "semesterRegistration must be required",
        }),
        academicSemester: z.string({
            required_error: "academicSemester must be required",
        }),
        academicFaculty: z.string({
            required_error: "academicSemester must be required",
        }),
        academicDepartment: z.string({
            required_error: "academicDepartment must be required",
        }),
        faculty: z.string({
            required_error: "faculty must be required",
        }),
        course: z.string({
            required_error: "course must be required",
        }),
        maxCapacity: z.number({
            required_error: "maxCapacity must be required",
        }),
        section: z.number({ required_error: "section must be required" }),
        days: z.enum([...Days] as [string, ...string[]]),
        startTime: z.string({
            required_error: "startTime must be required",
        }),
        endTime: z.string({
            required_error: "endTime must be required",
        }),
    }),
});

export const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z
            .string({
                required_error: "faculty must be required",
            })
            .optional(),
        maxCapacity: z
            .number({ required_error: "maxCapacity must be required" })
            .optional(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
        startTime: z
            .string({
                required_error: "startTime must be required",
            })
            .optional(),
        endTime: z
            .string({
                required_error: "endTime must be required",
            })
            .optional(),
    }),
});
